/* ============================================
   TEMA CLARO/ESCURO - Levità Podologia
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // ===== CARREGAR TEMA SALVO =====
    const temaSalvo = localStorage.getItem('tema');
    const icon = themeToggle.querySelector('i');
    
    if (temaSalvo === 'escuro') {
        document.body.classList.add('tema-escuro');
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    // ===== ALTERNAR TEMA =====
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('tema-escuro');
        
        const icon = this.querySelector('i');
        if (document.body.classList.contains('tema-escuro')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('tema', 'escuro');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('tema', 'claro');
        }
        
        // Animação de transição
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(function() {
            document.body.style.transition = '';
        }, 300);
    });
});

// ===== DETECTAR PREFERÊNCIA DO SISTEMA =====
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        const temaSalvo = localStorage.getItem('tema');
        if (!temaSalvo) {
            document.body.classList.add('tema-escuro');
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                icon.className = 'fas fa-sun';
            }
        }
    }
}

// Executar ao carregar
detectSystemTheme();

// Escutar mudanças no tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const temaSalvo = localStorage.getItem('tema');
    if (!temaSalvo) {
        if (e.matches) {
            document.body.classList.add('tema-escuro');
        } else {
            document.body.classList.remove('tema-escuro');
        }
    }
});