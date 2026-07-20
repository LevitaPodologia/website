/* ============================================
   TEMA CLARO/ESCURO - Levità Podologia
   ============================================ */

// ===== INICIAR QUANDO O DOM ESTIVER PRONTO =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Se não houver botão de toggle, não executa
    if (!themeToggle) return;
    
    // ===== CARREGAR TEMA SALVO =====
    const temaSalvo = localStorage.getItem('tema');
    const icon = themeToggle.querySelector('i');
    
    // Aplicar tema salvo ou detectar preferência do sistema
    if (temaSalvo === 'escuro') {
        ativarTemaEscuro(icon);
    } else if (temaSalvo === 'claro') {
        ativarTemaClaro(icon);
    } else {
        // Se não houver tema salvo, detectar preferência do sistema
        detectarTemaSistema(icon);
    }
    
    // ===== EVENTO DE CLIQUE PARA ALTERNAR TEMA =====
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.contains('tema-escuro');
        const icon = this.querySelector('i');
        
        if (isDark) {
            ativarTemaClaro(icon);
        } else {
            ativarTemaEscuro(icon);
        }
    });
});

// ============================================
// FUNÇÕES DE TEMA
// ============================================

// ===== ATIVAR TEMA ESCURO =====
function ativarTemaEscuro(icon) {
    document.body.classList.add('tema-escuro');
    if (icon) {
        icon.className = 'fas fa-sun';
        icon.style.color = '#f1c40f';
    }
    localStorage.setItem('tema', 'escuro');
    
    // Disparar evento para outros scripts (opcional)
    document.dispatchEvent(new CustomEvent('temaAlterado', { 
        detail: { tema: 'escuro' } 
    }));
}

// ===== ATIVAR TEMA CLARO =====
function ativarTemaClaro(icon) {
    document.body.classList.remove('tema-escuro');
    if (icon) {
        icon.className = 'fas fa-moon';
        icon.style.color = '';
    }
    localStorage.setItem('tema', 'claro');
    
    // Disparar evento para outros scripts (opcional)
    document.dispatchEvent(new CustomEvent('temaAlterado', { 
        detail: { tema: 'claro' } 
    }));
}

// ===== DETECTAR PREFERÊNCIA DO SISTEMA =====
function detectarTemaSistema(icon) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        ativarTemaEscuro(icon);
    } else {
        ativarTemaClaro(icon);
    }
}

// ============================================
// OUVIR MUDANÇAS NO TEMA DO SISTEMA
// ============================================
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', function(e) {
        // Só mudar automaticamente se o usuário NÃO tiver escolhido manualmente
        const temaSalvo = localStorage.getItem('tema');
        if (!temaSalvo) {
            const icon = document.querySelector('#theme-toggle i');
            if (e.matches) {
                ativarTemaEscuro(icon);
            } else {
                ativarTemaClaro(icon);
            }
        }
    });
}

// ============================================
// ANIMAÇÃO DE TRANSIÇÃO PARA O TEMA
// ============================================
// Adiciona uma transição suave quando o tema muda
document.addEventListener('temaAlterado', function() {
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    
    // Adicionar transição para todos os elementos que mudam de cor
    const elementos = document.querySelectorAll(
        '.card, .servico-card, .diferencial-item, .depoimento-card, ' +
        '.faq-item, .contato-box, .contato-mapa, .galeria-item, ' +
        'header, footer, .banner-home, .hero'
    );
    
    elementos.forEach(function(el) {
        el.style.transition = 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease';
    });
    
    // Remover transição após um tempo para não afetar outros eventos
    setTimeout(function() {
        document.body.style.transition = '';
        elementos.forEach(function(el) {
            el.style.transition = '';
        });
    }, 500);
});

// ============================================
// EXPOR FUNÇÕES GLOBAIS (opcional)
// ============================================
window.tema = {
    ativarEscuro: ativarTemaEscuro,
    ativarClaro: ativarTemaClaro,
    alternar: function() {
        const isDark = document.body.classList.contains('tema-escuro');
        const icon = document.querySelector('#theme-toggle i');
        if (isDark) {
            ativarTemaClaro(icon);
        } else {
            ativarTemaEscuro(icon);
        }
    },
    getTemaAtual: function() {
        return document.body.classList.contains('tema-escuro') ? 'escuro' : 'claro';
    }
};

// ============================================
// LOG PARA DEBUG (opcional)
// ============================================
console.log('🌓 Tema carregado:', window.tema.getTemaAtual());