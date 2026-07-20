/* ============================================
   ANIMAÇÕES DE ENTRADA - Levità Podologia
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ELEMENTOS QUE SERÃO ANIMADOS =====
    const elementos = document.querySelectorAll(
        '.servico-card, .diferencial-item, .depoimento-card, .galeria-item, .faq-item'
    );
    
    if (!elementos.length) return;
    
    // ===== CONFIGURAR ESTADO INICIAL =====
    elementos.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // ===== OBSERVER PARA ANIMAR AO ROLAR =====
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // ===== OBSERVAR CADA ELEMENTO =====
    elementos.forEach(function(el) {
        observer.observe(el);
    });
    
    // ===== FORÇAR ANIMAÇÃO PARA ELEMENTOS JÁ VISÍVEIS =====
    setTimeout(function() {
        elementos.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 200);
});

// ===== ANIMAÇÃO AO ROLAR PARA BANNERS =====
document.addEventListener('scroll', function() {
    const banners = document.querySelectorAll('.banner-atendimento, .hero');
    banners.forEach(function(banner) {
        const rect = banner.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            banner.classList.add('animar-fade');
        }
    });
});