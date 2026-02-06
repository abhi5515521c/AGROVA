/**
 * ANIMATIONS.JS
 * Additional animation utilities and effects
 */

// ==========================================
// SCROLL-BASED PARALLAX
// ==========================================

function initScrollParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ==========================================
// MOUSE PARALLAX EFFECT
// ==========================================

function initMouseParallax() {
    const cards = document.querySelectorAll('.tech-card, .benefit-card, .contact-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==========================================
// TYPING EFFECT
// ==========================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ==========================================
// REVEAL ANIMATION
// ==========================================

function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(reveal => observer.observe(reveal));
}

// ==========================================
// STAGGER ANIMATION
// ==========================================

function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * delay);
    });
}

// ==========================================
// RIPPLE EFFECT
// ==========================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.hero-cta, .contact-btn, .submit-btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ==========================================
// SMOOTH NUMBER COUNTER
// ==========================================

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// ==========================================
// CURSOR TRAIL EFFECT
// ==========================================

function initCursorTrail() {
    const trail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });

        if (trail.length > trailLength) {
            trail.shift();
        }

        // Draw trail (optional - can be implemented with canvas)
    });
}

// ==========================================
// SECTION FADE-IN ON SCROLL
// ==========================================

function initSectionFadeIn() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
}

// ==========================================
// IMAGE LAZY LOAD WITH BLUR
// ==========================================

function initLazyLoadWithBlur() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.filter = 'blur(10px)';
                img.src = img.getAttribute('data-src');

                img.onload = () => {
                    img.style.filter = 'blur(0)';
                    img.style.transition = 'filter 0.5s ease-out';
                };

                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// INITIALIZE ALL ANIMATIONS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollParallax();
    initMouseParallax();
    initRevealAnimations();
    initMagneticButtons();
    // initSectionFadeIn(); // Optional - can be enabled for more dramatic effect
});

// ==========================================
// EXPORT FUNCTIONS (if using modules)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        typeWriter,
        staggerAnimation,
        createRipple,
        animateNumber
    };
}
