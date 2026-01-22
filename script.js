// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Criar partículas douradas
    createParticles();
    
    // Smooth Scroll
    initSmoothScroll();
    
    // Animação de Números
    initCounterAnimation();
    
    // Lazy Loading para Imagens
    initLazyLoading();
    
    // Animações de Scroll
    initScrollAnimations();
    
    // Timeline Animations
    initTimelineAnimations();
    
    // Modal de Portfólio
    initPortfolioModal();
    
    // Formulário de Contato
    initContactForm();
});

// ===== PARTÍCULAS DOURADAS =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle(particlesContainer);
        }, i * 200);
    }
    
    // Criar partículas continuamente
    setInterval(() => {
        createParticle(particlesContainer);
    }, 400);
}

function createParticle(container) {
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
    
    // Delay aleatório
    const delay = Math.random() * 2;
    particle.style.animationDelay = delay + 's';
    
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

// ===== LAZY LOADING DE IMAGENS =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

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

// ===== MODAL DE PORTFÓLIO =====
function initPortfolioModal() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openModal(img.src, img.alt);
            }
        });
    });
}

function openModal(imgSrc, imgAlt) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 cursor-pointer';
    modal.onclick = () => closeModal(modal);
    
    const container = document.createElement('div');
    container.className = 'relative max-w-5xl max-h-[90vh]';
    container.onclick = (e) => e.stopPropagation();
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgAlt;
    img.className = 'max-w-full max-h-[90vh] object-contain rounded-lg';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'absolute top-4 right-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors';
    closeBtn.innerHTML = `
        <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    `;
    closeBtn.onclick = () => closeModal(modal);
    
    container.appendChild(img);
    container.appendChild(closeBtn);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    // Animação de entrada
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    // Fechar com ESC
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
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
    const phone = '5551998183087'; // Substitua pelo número real
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