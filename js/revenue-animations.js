/**
 * Revenue Distribution Section - Interactive Animations
 * Handles scroll animations, card interactions, and visual effects
 */

document.addEventListener('DOMContentLoaded', function () {
    initRevenueAnimations();
});

function initRevenueAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe flow steps
    const flowSteps = document.querySelectorAll('.flow-step');
    flowSteps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(step);
    });

    // Observe stakeholder cards
    const stakeholderCards = document.querySelectorAll('.stakeholder-card');
    stakeholderCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add interactive hover effects to stakeholder cards
    addStakeholderCardEffects();

    // Add number counting animation
    addCountingAnimation();

    // Add flow arrow pulse animation
    addFlowArrowAnimation();
}

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger number counting when visible
            if (entry.target.classList.contains('flow-step')) {
                animateNumbers(entry.target);
            }
        }
    });
}

function addStakeholderCardEffects() {
    const cards = document.querySelectorAll('.stakeholder-card');

    cards.forEach(card => {
        // Add click to expand effect
        card.addEventListener('click', function () {
            // Remove active class from all cards
            cards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            this.classList.add('active');

            // Add pulse effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });

        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

function animateNumbers(element) {
    const amounts = element.querySelectorAll('.flow-amount, .breakdown-value');

    amounts.forEach(amount => {
        const text = amount.textContent;
        const match = text.match(/₹?([\d.]+)/);

        if (match) {
            const targetNumber = parseFloat(match[1]);
            animateValue(amount, 0, targetNumber, 1500, text);
        }
    });
}

function animateValue(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const prefix = originalText.includes('₹') ? '₹' : '';
    const suffix = originalText.replace(/₹?[\d.]+/, '').trim();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;

        element.textContent = `${prefix}${current.toFixed(2)} ${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = originalText;
        }
    }

    requestAnimationFrame(update);
}

function addCountingAnimation() {
    const earningsAmounts = document.querySelectorAll('.earnings-amount');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const text = entry.target.textContent;
                const match = text.match(/₹([\d–-]+)/);

                if (match) {
                    entry.target.dataset.animated = 'true';

                    // Add shimmer effect
                    entry.target.style.animation = 'shimmer 2s ease-in-out';

                    setTimeout(() => {
                        entry.target.style.animation = '';
                    }, 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    earningsAmounts.forEach(amount => observer.observe(amount));
}

function addFlowArrowAnimation() {
    const arrows = document.querySelectorAll('.flow-arrow');

    arrows.forEach((arrow, index) => {
        // Stagger the animation
        arrow.style.animationDelay = `${index * 0.2}s`;

        // Add glow effect on hover of adjacent flow steps
        const prevStep = arrow.previousElementSibling;
        const nextStep = arrow.nextElementSibling;

        if (prevStep) {
            prevStep.addEventListener('mouseenter', () => {
                arrow.style.color = '#F5A623';
                arrow.style.textShadow = '0 0 20px rgba(245, 166, 35, 0.8)';
            });

            prevStep.addEventListener('mouseleave', () => {
                arrow.style.color = '';
                arrow.style.textShadow = '';
            });
        }

        if (nextStep) {
            nextStep.addEventListener('mouseenter', () => {
                arrow.style.color = '#F5A623';
                arrow.style.textShadow = '0 0 20px rgba(245, 166, 35, 0.8)';
            });

            nextStep.addEventListener('mouseleave', () => {
                arrow.style.color = '';
                arrow.style.textShadow = '';
            });
        }
    });
}

// Add particle effect on stakeholder card hover
function createParticle(x, y, card) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(245, 166, 35, 0.8)';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';

    card.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let posX = x;
    let posY = y;
    let opacity = 1;

    function animate() {
        posX += vx;
        posY += vy;
        opacity -= 0.02;

        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    animate();
}

// Add sparkle effect to benefit tags
document.querySelectorAll('.benefit-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 20px rgba(0, 217, 217, 0.5)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Add smooth scroll to revenue section from navigation
const revenueLinks = document.querySelectorAll('a[href="#revenue"]');
revenueLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const revenueSection = document.querySelector('#revenue');
        if (revenueSection) {
            revenueSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add keyboard navigation for stakeholder cards
document.addEventListener('keydown', function (e) {
    const cards = Array.from(document.querySelectorAll('.stakeholder-card'));
    const activeCard = document.querySelector('.stakeholder-card.active');

    if (!activeCard || cards.length === 0) return;

    const currentIndex = cards.indexOf(activeCard);
    let nextIndex;

    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            nextIndex = (currentIndex + 1) % cards.length;
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            nextIndex = (currentIndex - 1 + cards.length) % cards.length;
            break;
        default:
            return;
    }

    cards[currentIndex].classList.remove('active');
    cards[nextIndex].classList.add('active');
    cards[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    e.preventDefault();
});

// Add dynamic background gradient that follows mouse
const revenueSection = document.querySelector('.revenue-section');
if (revenueSection) {
    revenueSection.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        this.style.setProperty('--mouse-x', x + '%');
        this.style.setProperty('--mouse-y', y + '%');
    });
}

console.log('Revenue distribution animations initialized');
