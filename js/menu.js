/* ============================================
   MENU MOBILE - Levità Podologia
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Verificar se os elementos existem
    if (!menuToggle || !navLinks) return;
    
    // ===== ABRIR/FECHAR MENU =====
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('aberto');
        this.classList.toggle('ativo');
        
        // Mudar ícone do menu
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('aberto')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // ===== FECHAR MENU AO CLICAR EM UM LINK =====
    document.querySelectorAll('#nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('aberto');
            menuToggle.classList.remove('ativo');
            
            // Voltar ícone para hambúrguer
            const icon = menuToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
    
    // ===== FECHAR MENU AO CLICAR FORA =====
    document.addEventListener('click', function(event) {
        const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside) {
            navLinks.classList.remove('aberto');
            menuToggle.classList.remove('ativo');
            
            // Voltar ícone para hambúrguer
            const icon = menuToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
    
    // ===== FECHAR MENU AO ROLAR A PÁGINA =====
    window.addEventListener('scroll', function() {
        if (navLinks.classList.contains('aberto')) {
            navLinks.classList.remove('aberto');
            menuToggle.classList.remove('ativo');
            
            // Voltar ícone para hambúrguer
            const icon = menuToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
    
    // ===== FECHAR MENU AO REDIMENSIONAR A TELA =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('aberto');
            menuToggle.classList.remove('ativo');
            
            // Voltar ícone para hambúrguer
            const icon = menuToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
});