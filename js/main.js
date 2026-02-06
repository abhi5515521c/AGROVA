/**
 * MAIN JAVASCRIPT
 * Core functionality, scroll animations, and interactions
 */

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initCounters();
    initComparisonSlider();
    initContactForm();
    initScrollProgress();
    initSmoothScroll();
    initSketchfab();
});

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe problem cards
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Observe benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe tech cards
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counter.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// COMPARISON SLIDER
// ==========================================

function initComparisonSlider() {
    const slider = document.getElementById('comparison-slider');
    const afterSection = document.getElementById('after-section');
    const sliderButton = document.getElementById('slider-button');

    if (!slider || !afterSection || !sliderButton) return;

    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        afterSection.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        sliderButton.style.left = `${value}%`;
    });

    // Mouse drag functionality
    let isDragging = false;

    slider.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);

    slider.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
}

// ==========================================
// CONTACT FORM
// ==========================================

function initContactForm() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    const formContainer = document.getElementById('contact-form-container');
    const contactForm = document.getElementById('contact-form');
    const formTitle = document.getElementById('form-title');
    const contactType = document.getElementById('contact-type');

    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            contactType.value = type;

            // Update form title based on type
            const titles = {
                'farmer': 'Start Your Farming Journey',
                'investor': 'Investment Inquiry',
                'institution': 'Partnership Request'
            };

            formTitle.textContent = titles[type] || 'Get In Touch';

            // Show form
            formContainer.classList.add('active');

            // Scroll to form
            setTimeout(() => {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your interest! We will contact you soon.');

        // Reset form
        contactForm.reset();
        formContainer.classList.remove('active');

        // In production, send data to backend
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    });
}

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================

function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==========================================
// PARALLAX EFFECT (Mouse Movement)
// ==========================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Optimize scroll events
const optimizedScroll = throttle(() => {
    // Scroll-dependent code here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Optimize resize events
const optimizedResize = debounce(() => {
    // Resize-dependent code here
}, 250);

window.addEventListener('resize', optimizedResize);

// ==========================================
// SKETCHFAB 3D MODEL LOADER
// ==========================================

function initSketchfab() {
    const sketchfabIframe = document.querySelector('.sketchfab-embed-wrapper iframe');
    const loadingMessage = document.querySelector('.sketchfab-loading');

    if (!sketchfabIframe || !loadingMessage) return;

    // Hide loading message when iframe loads
    sketchfabIframe.addEventListener('load', () => {
        setTimeout(() => {
            loadingMessage.style.opacity = '0';
            setTimeout(() => {
                loadingMessage.style.display = 'none';
            }, 500);
        }, 2000); // Wait 2 seconds after load to ensure model is rendering
    });

    // Handle iframe errors
    sketchfabIframe.addEventListener('error', () => {
        loadingMessage.innerHTML = `
            <p style="color: #E53935; font-weight: 600;">⚠️ Failed to load 3D model</p>
            <p style="font-size: 0.875rem; margin-top: 0.5rem;">Please check your internet connection or try refreshing the page</p>
        `;
    });

    // Timeout fallback - hide loading after 10 seconds regardless
    setTimeout(() => {
        if (loadingMessage.style.display !== 'none') {
            loadingMessage.style.opacity = '0';
            setTimeout(() => {
                loadingMessage.style.display = 'none';
            }, 500);
        }
    }, 10000);
}

// ==========================================
// CONSOLE BRANDING
// ==========================================

console.log('%c🌾 AGROVA ', 'background: linear-gradient(135deg, #FFC107 0%, #FF9800 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%cRedesigning Indian Farms for a Sustainable Future', 'color: #4A3728; font-size: 14px; font-weight: 600;');
