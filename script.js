// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll
    initSmoothScroll();
    
    // Animação de Números
    initCounterAnimation();
    
    // Animações de Scroll
    initScrollAnimations();
    
    // Timeline Animations
    initTimelineAnimations();
    
    // Modal de Portfólio
    initPortfolioModal();
    
    // Formulário de Contato
    initContactForm();
    
    // Criar partículas depois de tudo carregar (não bloqueia)
    setTimeout(createParticles, 1000);
});

// ===== PARTÍCULAS DOURADAS =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    // Criar partículas INICIAIS já no meio da animação
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, true); // true = começa no meio da animação
    }
    
    // Depois continua criando novas partículas normalmente
    setInterval(() => {
        createParticle(particlesContainer, false); // false = animação normal
    }, 800);
}

function createParticle(container, startMidAnimation = false) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória horizontal
    const randomX = Math.random() * 100;
    particle.style.left = randomX + '%';
    particle.style.bottom = '0';
    
    // Deriva aleatória horizontal
    const drift = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--drift', drift + 'px');
    
    // Tamanho aleatório
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Se for partícula inicial, começa com delay negativo (já no meio da animação)
    if (startMidAnimation) {
        const negativeDelay = -(Math.random() * 8); // Entre -8s e 0s
        particle.style.animationDelay = negativeDelay + 's';
    } else {
        // Delay aleatório normal
        const delay = Math.random() * 2;
        particle.style.animationDelay = delay + 's';
    }
    
    container.appendChild(particle);
    
    // Remover após a animação
    setTimeout(() => {
        particle.remove();
    }, 10000);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 80;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMAÇÃO DE NÚMEROS (COUNTER) =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.text-5xl.font-bold');
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseInt(text.replace(/\D/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';
        
        element.textContent = displayValue;
    }, duration / steps);
}

// ===== SCROLL ANIMATIONS =====
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            scrollObserver.unobserve(entry.target); // Para de observar após animar
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(element);
    });
}

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// ===== CAROUSEL DE PORTFÓLIO + LIGHTBOX =====
const portfolioPhotos = [
    { src: '11.jpeg', alt: 'Portfólio 1' },
    { src: '1.jpeg',  alt: 'Portfólio 2' },
    { src: '33.jpeg', alt: 'Portfólio 3' },
    { src: '13.jpeg', alt: 'Portfólio 4' },
    { src: '2.jpeg',  alt: 'Portfólio 5' },
    { src: '3.jpeg',  alt: 'Portfólio 6' },
    { src: '4.jpeg',  alt: 'Portfólio 7' },
    { src: '5.jpeg',  alt: 'Portfólio 8' },
    { src: '6.jpeg',  alt: 'Portfólio 9' },
    { src: '7.jpeg',  alt: 'Portfólio 10' },
    { src: '8.jpeg',  alt: 'Portfólio 11' },
    { src: '12.jpeg', alt: 'Portfólio 12' },
    { src: '15.jpeg', alt: 'Portfólio 13' },
    { src: '16.jpeg', alt: 'Portfólio 14' },
    { src: '17.jpeg', alt: 'Portfólio 15' },
];

function getPerPage() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

let carouselPage = 0;
let carouselAutoPlay = null;

function initPortfolioModal() {
    const track    = document.getElementById('portfolio-track');
    const dotsEl   = document.getElementById('portfolio-dots');
    const prevBtn  = document.getElementById('portfolio-prev');
    const nextBtn  = document.getElementById('portfolio-next');

    if (!track) return;

    let perPage = getPerPage();
    let totalPages = Math.ceil(portfolioPhotos.length / perPage);

    function buildSlides() {
        perPage = getPerPage();
        totalPages = Math.ceil(portfolioPhotos.length / perPage);
        track.innerHTML = '';
        dotsEl.innerHTML = '';
        carouselPage = 0;

        for (let p = 0; p < totalPages; p++) {
            const slide = document.createElement('div');
            slide.className = 'min-w-full grid gap-4 p-1';
            slide.style.gridTemplateColumns = `repeat(${perPage}, minmax(0, 1fr))`;

            const start = p * perPage;
            const end = Math.min(start + perPage, portfolioPhotos.length);

            for (let i = start; i < end; i++) {
                const photo = portfolioPhotos[i];
                const wrap = document.createElement('div');
                wrap.className = 'portfolio-item group relative overflow-hidden rounded-lg aspect-square cursor-pointer';
                wrap.innerHTML = `
                    <img src="${photo.src}" alt="${photo.alt}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span class="text-white text-sm tracking-widest uppercase font-semibold">Ver</span>
                    </div>
                `;
                wrap.addEventListener('click', () => lbOpen(i));
                slide.appendChild(wrap);
            }
            track.appendChild(slide);

            // Dot
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full transition-all duration-300 ' + (p === 0 ? 'bg-yellow-500 scale-125' : 'bg-zinc-600 hover:bg-zinc-400');
            dot.setAttribute('aria-label', 'Página ' + (p + 1));
            dot.addEventListener('click', () => goToPage(p));
            dotsEl.appendChild(dot);
        }

        // Re-init scroll animations on new items
        initScrollAnimations();
    }

    function goToPage(page) {
        carouselPage = page;
        track.style.transform = `translateX(-${page * 100}%)`;
        Array.from(dotsEl.children).forEach((dot, i) => {
            dot.className = 'w-3 h-3 rounded-full transition-all duration-300 ' +
                (i === page ? 'bg-yellow-500 scale-125' : 'bg-zinc-600 hover:bg-zinc-400');
        });
    }

    function next() { goToPage(carouselPage < totalPages - 1 ? carouselPage + 1 : 0); }
    function prev() { goToPage(carouselPage > 0 ? carouselPage - 1 : totalPages - 1); }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    carouselAutoPlay = setInterval(next, 5000);

    // Touch/swipe
    let touchStartX = 0;
    track.parentElement.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    track.parentElement.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    });

    buildSlides();

    // Rebuild on resize
    window.addEventListener('resize', debounce(() => {
        if (getPerPage() !== perPage) buildSlides();
    }, 200));

    // ─── LIGHTBOX ───────────────────────────────────────
    let lbIndex = 0;
    const lb      = document.getElementById('portfolio-lightbox');
    const lbImg   = document.getElementById('lb-img');
    const lbCount = document.getElementById('lb-counter');

    function lbRender() {
        const photo = portfolioPhotos[lbIndex];
        lbImg.style.opacity = '0';
        lbImg.src = photo.src;
        lbImg.alt = photo.alt;
        lbImg.onload = () => { lbImg.style.opacity = '1'; };
        lbCount.textContent = `${lbIndex + 1} / ${portfolioPhotos.length}`;
    }

    function lbOpen(index) {
        lbIndex = index;
        lb.classList.remove('hidden');
        lb.classList.add('flex');
        document.body.style.overflow = 'hidden';
        clearInterval(carouselAutoPlay);
        lbRender();
    }

    function lbClose() {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
        document.body.style.overflow = '';
        carouselAutoPlay = setInterval(next, 5000);
    }

    function lbNext() { lbIndex = lbIndex < portfolioPhotos.length - 1 ? lbIndex + 1 : 0; lbRender(); }
    function lbPrev() { lbIndex = lbIndex > 0 ? lbIndex - 1 : portfolioPhotos.length - 1; lbRender(); }

    document.getElementById('lb-close').addEventListener('click', lbClose);
    document.getElementById('lb-next').addEventListener('click', lbNext);
    document.getElementById('lb-prev').addEventListener('click', lbPrev);
    lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });

    // Touch swipe no lightbox
    let lbTouchX = 0;
    lb.addEventListener('touchstart', (e) => { lbTouchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
        const diff = lbTouchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? lbNext() : lbPrev();
    });

    document.addEventListener('keydown', (e) => {
        if (lb.classList.contains('hidden')) return;
        if (e.key === 'ArrowRight') lbNext();
        if (e.key === 'ArrowLeft') lbPrev();
        if (e.key === 'Escape') lbClose();
    });
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        const btnText = button.textContent.trim().toUpperCase();
        if (btnText.includes('AGENDAR')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleSchedule();
            });
        }
    });
}

function handleSchedule() {
    const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta para uma tatuagem.');
    const phone = '5551998183087';
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    
    showNotification('Redirecionando para WhatsApp...', 'success');
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000);
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-yellow-500 text-black',
        warning: 'bg-orange-500 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// ===== UTILITÁRIOS =====

// Debounce para otimizar eventos de scroll/resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.querySelectorAll('button').forEach(btn => {
  if (btn.innerText.toUpperCase().includes('AGENDAR')) {
    btn.addEventListener('click', () => {
      window.open('https://wa.me/5551998183087', '_blank');
    });
  }
});

// Throttle para limitar chamadas de função
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Log de desenvolvimento
console.log('%c🎨 Robert Tattoo Website', 'color: #fbbf24; font-size: 20px; font-weight: bold;');
console.log('%c✨ Desenvolvido com amor e dedicação', 'color: #d97706; font-size: 14px;');