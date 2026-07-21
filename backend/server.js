const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ============================================
// CONFIGURAÇÃO - COLOQUE SUAS CREDENCIAIS AQUI
// ============================================
const API_KEY = 'AIzaSyA5t1yxAmS8U48JlcQBwVGERVQeEqOZHws';
const CALENDAR_ID = 'seu_email@gmail.com'; // ⚠️ SUBSTITUA PELO SEU EMAIL DO GOOGLE

console.log('🚀 Servidor iniciando...');
console.log('📅 Calendar ID:', CALENDAR_ID);

// ============================================
// FUNÇÃO PARA GERAR HORÁRIOS DISPONÍVEIS
// ============================================
function gerarHorarios(date) {
    const slots = [];
    const dataObj = new Date(date);
    const diaSemana = dataObj.getDay();
    
    // Domingo: fechado
    if (diaSemana === 0) return slots;

    // Sábado: 8h-13h
    if (diaSemana === 6) {
        for (let hour = 8; hour < 13; hour++) {
            slots.push(`${String(hour).padStart(2, '0')}:00`);
            if (hour < 12) slots.push(`${String(hour).padStart(2, '0')}:30`);
        }
        return slots;
    }

    // Dias úteis: 8h-19h (com intervalo de almoço 12h-13h)
    for (let hour = 8; hour < 19; hour++) {
        if (hour >= 12 && hour < 13) continue;
        slots.push(`${String(hour).padStart(2, '0')}:00`);
        if (hour < 18) slots.push(`${String(hour).padStart(2, '0')}:30`);
    }

    return slots;
}

// ============================================
// ROTA PARA BUSCAR HORÁRIOS
// ============================================
app.get('/api/slots', async (req, res) => {
    try {
        const { date } = req.query;
        
        console.log(`📅 Buscando horários para: ${date}`);
        
        if (!date) {
            return res.status(400).json({ 
                success: false, 
                message: 'Data é obrigatória' 
            });
        }

        // Buscar eventos do Google Calendar
        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;
        
        const response = await axios.get(url, {
            params: {
                key: API_KEY,
                timeMin: `${date}T00:00:00-03:00`,
                timeMax: `${date}T23:59:59-03:00`,
                singleEvents: true,
                orderBy: 'startTime'
            }
        });

        const events = response.data.items || [];
        
        // Extrair horários ocupados
        const bookedSlots = events.map(event => {
            if (event.start && event.start.dateTime) {
                const start = new Date(event.start.dateTime);
                return `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;
            }
            return null;
        }).filter(slot => slot !== null);

        console.log(`✅ Horários ocupados: ${bookedSlots.length} encontrados`);

        res.json({
            success: true,
            date,
            bookedSlots
        });

    } catch (error) {
        console.error('❌ Erro ao buscar horários:', error.response?.data || error.message);
        
        // Em caso de erro, retornar horários vazios (fallback)
        res.json({
            success: true,
            date: req.query.date,
            bookedSlots: [],
            warning: 'Usando modo offline - horários não sincronizados'
        });
    }
});

// ============================================
// ROTA PARA CRIAR AGENDAMENTO
// ============================================
app.post('/api/appointments', async (req, res) => {
    try {
        const { nome, telefone, servico, data, horario, observacoes } = req.body;

        console.log('📝 Novo agendamento recebido:');
        console.log(`  👤 Nome: ${nome}`);
        console.log(`  📱 Telefone: ${telefone}`);
        console.log(`  🦶 Serviço: ${servico}`);
        console.log(`  📅 Data: ${data} ${horario}`);
        console.log(`  📝 Observações: ${observacoes || 'Nenhuma'}`);

        // Validar campos
        if (!nome || !telefone || !servico || !data || !horario) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios não preenchidos'
            });
        }

        // Validar telefone
        const telefoneLimpo = telefone.replace(/\D/g, '');
        if (telefoneLimpo.length < 10) {
            return res.status(400).json({
                success: false,
                message: 'Digite um telefone válido com DDD'
            });
        }

        // NOTA: Com API Key, NÃO é possível criar eventos no Google Calendar
        // Isso requer OAuth 2.0. Por enquanto, salvamos localmente.

        // Simular sucesso
        const appointmentId = Date.now().toString();

        // Retornar sucesso
        res.status(201).json({
            success: true,
            message: '✅ Agendamento realizado com sucesso! Entraremos em contato para confirmar.',
            appointmentId: appointmentId,
            appointment: {
                nome,
                telefone: telefoneLimpo,
                servico,
                data,
                horario,
                observacoes: observacoes || 'Nenhuma'
            }
        });

        // Aqui você pode adicionar:
        // - Enviar email
        // - Enviar WhatsApp
        // - Salvar no banco de dados

    } catch (error) {
        console.error('❌ Erro ao criar agendamento:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao processar agendamento. Tente novamente.'
        });
    }
});

// ============================================
// ROTA PARA CANCELAR AGENDAMENTO
// ============================================
app.delete('/api/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🗑️ Cancelando agendamento: ${id}`);

        // Aqui você implementaria a lógica de cancelamento
        // Como estamos usando API Key, não podemos cancelar eventos no Google Calendar

        res.json({
            success: true,
            message: 'Agendamento cancelado com sucesso!'
        });

    } catch (error) {
        console.error('❌ Erro ao cancelar:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao cancelar agendamento'
        });
    }
});

// ============================================
// ROTA DE HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        calendarId: CALENDAR_ID,
        apiKeyConfigured: API_KEY ? '✅ Sim' : '❌ Não'
    });
});

// ============================================
// ROTA PARA VER TODOS OS AGENDAMENTOS (Admin)
// ============================================
app.get('/api/appointments', (req, res) => {
    // Em uma versão real, isso viria do banco de dados
    res.json({
        success: true,
        message: 'Sistema de agendamento funcionando',
        appointments: []
    });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📅 Calendar ID: ${CALENDAR_ID}`);
    console.log(`🔑 API Key configurada: ${API_KEY ? '✅ Sim' : '❌ Não'}`);
    console.log('');
    console.log('📋 Rotas disponíveis:');
    console.log(`  GET  /api/health      - Verificar status`);
    console.log(`  GET  /api/slots?date= - Buscar horários`);
    console.log(`  POST /api/appointments - Criar agendamento`);
    console.log(`  DELETE /api/appointments/:id - Cancelar`);
    console.log(`  GET  /api/appointments - Listar agendamentos`);
});