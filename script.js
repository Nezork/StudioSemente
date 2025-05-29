// Script para o site Terroso - Inspirado no site Laje-AC

document.addEventListener('DOMContentLoaded', function() {
    // Variáveis
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backToTopButton = document.querySelector('.back-to-top');
    const sliderDots = document.querySelectorAll('.dot');
    const jornadas = document.querySelectorAll('.jornada-card');
    const jornadasSlider = document.querySelector('.jornadas-slider');
    
    // Toggle Menu Mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Animação do ícone do menu
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Botão Voltar ao Topo
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Slider de Jornadas
    if (sliderDots.length > 0 && jornadas.length > 0) {
        // Configurar o slider inicialmente
        updateSlider(0);
        
        // Adicionar eventos aos dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                updateSlider(index);
            });
        });
        
        // Função para atualizar o slider
        function updateSlider(activeIndex) {
            // Atualizar dots
            sliderDots.forEach((dot, i) => {
                if (i === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Scroll para o card ativo
            if (jornadas[activeIndex]) {
                const cardWidth = jornadas[activeIndex].offsetWidth;
                const cardMargin = parseInt(window.getComputedStyle(jornadas[activeIndex]).marginRight);
                const scrollPosition = (cardWidth + cardMargin) * activeIndex;
                
                jornadasSlider.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }
        
        // Detectar scroll no slider para atualizar os dots
        let isScrolling;
        jornadasSlider.addEventListener('scroll', function() {
            window.clearTimeout(isScrolling);
            
            isScrolling = setTimeout(function() {
                // Calcular qual card está mais visível
                const cardWidth = jornadas[0].offsetWidth;
                const cardMargin = parseInt(window.getComputedStyle(jornadas[0]).marginRight);
                const scrollPosition = jornadasSlider.scrollLeft;
                const activeIndex = Math.round(scrollPosition / (cardWidth + cardMargin));
                
                // Atualizar dots
                sliderDots.forEach((dot, i) => {
                    if (i === activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }, 100);
        });
    }
    
    // Animação de entrada para elementos
    const animateElements = document.querySelectorAll('.hero-text, .hero-image, .jornada-card, .beneficio-item, .trajetoria-content, .comunidade-content');
    
    // Função para verificar se elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Função para animar elementos visíveis
    function animateOnScroll() {
        animateElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar elementos para animação
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Executar animação no carregamento e no scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Efeito de hover nos cards de benefícios
    const beneficioItems = document.querySelectorAll('.beneficio-item');
    
    beneficioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(48, 38, 32, 0.9)';
            this.style.borderColor = 'rgba(137, 171, 153, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(48, 38, 32, 0.7)';
            this.style.borderColor = 'rgba(119, 95, 78, 0.3)';
        });
    });
    
    // Efeito de parallax sutil no hero
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-full');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove classe 'active' de todos os botões
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});