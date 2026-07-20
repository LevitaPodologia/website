/* ============================================
   FAQ ACORDEÃO - Levità Podologia
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-pergunta');
    
    if (!faqItems.length) return;
    
    // ===== ABRIR PRIMEIRO ITEM POR PADRÃO =====
    const primeiroItem = document.querySelector('.faq-item');
    if (primeiroItem && !primeiroItem.classList.contains('ativo')) {
        primeiroItem.classList.add('ativo');
    }
    
    // ===== CLICK NAS PERGUNTAS =====
    faqItems.forEach(function(pergunta) {
        pergunta.addEventListener('click', function() {
            const item = this.parentElement;
            const isAtivo = item.classList.contains('ativo');
            
            // Fechar todos os itens
            document.querySelectorAll('.faq-item').forEach(function(i) {
                i.classList.remove('ativo');
            });
            
            // Abrir o item clicado se estava fechado
            if (!isAtivo) {
                item.classList.add('ativo');
            }
        });
    });
});