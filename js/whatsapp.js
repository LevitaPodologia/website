/* ============================================
   WHATSAPP FLUTUANTE - Levità Podologia
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const whatsapp = document.querySelector('.whatsapp-float');
    
    if (!whatsapp) return;
    
    // ===== CONFIGURAÇÕES =====
    const numero = '5511978303833';
    const mensagem = 'Olá, gostaria de agendar uma consulta domiciliar com a Renata Kemp.';
    const linkWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    // ===== ATUALIZAR LINK =====
    whatsapp.href = linkWhatsApp;
    
    // ===== EFEITO DE PULSE =====
    let pulseInterval = setInterval(function() {
        whatsapp.style.transform = 'scale(1.05)';
        whatsapp.style.transition = 'transform 0.3s ease';
        setTimeout(function() {
            whatsapp.style.transform = 'scale(1)';
        }, 300);
    }, 5000);
    
    // ===== PAUSAR PULSE AO HOVER =====
    whatsapp.addEventListener('mouseenter', function() {
        clearInterval(pulseInterval);
        this.style.transform = 'scale(1.08)';
    });
    
    whatsapp.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        pulseInterval = setInterval(function() {
            whatsapp.style.transform = 'scale(1.05)';
            setTimeout(function() {
                whatsapp.style.transform = 'scale(1)';
            }, 300);
        }, 5000);
    });
    
    // ===== CLICK =====
    whatsapp.addEventListener('click', function(e) {
        // Registrar no console para analytics
        console.log('WhatsApp clicado!');
        // Pode adicionar evento de tracking aqui
    });
});

// ===== FUNÇÃO PARA AGENDAMENTO RÁPIDO =====
function abrirWhatsApp(numero, mensagem) {
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
}

// Expor função global
window.abrirWhatsApp = abrirWhatsApp;