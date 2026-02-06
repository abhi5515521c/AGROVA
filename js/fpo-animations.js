/**
 * FPO Section Interactive Animations
 * Handles the interactive group icon and card animations
 */

document.addEventListener('DOMContentLoaded', function () {
    initFPOAnimations();
});

function initFPOAnimations() {
    const fpoIcon = document.querySelector('.fpo-group-icon');
    const persons = document.querySelectorAll('.person');
    const connectionLines = document.querySelectorAll('.connection-line');
    const fpoCards = document.querySelectorAll('.fpo-card');

    if (!fpoIcon) return;

    // Add hover effects to persons
    persons.forEach((person, index) => {
        person.addEventListener('mouseenter', function () {
            // Highlight the person
            this.style.transform = 'scale(1.15)';

            // Pulse the connection line if not central person
            if (index > 0) {
                const lineIndex = index - 1;
                if (connectionLines[lineIndex]) {
                    connectionLines[lineIndex].style.stroke = 'var(--color-molten-orange, #FF6B00)';
                    connectionLines[lineIndex].style.strokeWidth = '3';
                    connectionLines[lineIndex].style.opacity = '1';
                }
            }
        });

        person.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';

            // Reset connection line
            if (index > 0) {
                const lineIndex = index - 1;
                if (connectionLines[lineIndex]) {
                    connectionLines[lineIndex].style.stroke = 'rgba(255, 107, 0, 0.3)';
                    connectionLines[lineIndex].style.strokeWidth = '2';
                    connectionLines[lineIndex].style.opacity = '0.6';
                }
            }
        });

        // Click to show info
        person.addEventListener('click', function () {
            const messages = [
                'FPO - The backbone of AGROVA',
                'Farmer Member - Stakeholder, not customer',
                'Farmer Member - Part of collective strength',
                'Farmer Member - Shared infrastructure benefits',
                'Farmer Member - Access to financing',
                'Farmer Member - Market access through FPO',
                'Farmer Member - Technology adoption support',
                'Farmer Member - Climate resilience',
                'Farmer Member - Democratic governance'
            ];

            showTooltip(this, messages[index]);
        });
    });

    // Intersection Observer for card animations
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initially hide cards for animation
    fpoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cardObserver.observe(card);
    });

    // Add stagger hover effect to cards
    fpoCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
            // Slightly lift adjacent cards
            if (fpoCards[index - 1]) {
                fpoCards[index - 1].style.transform = 'translateY(-5px) scale(0.98)';
            }
            if (fpoCards[index + 1]) {
                fpoCards[index + 1].style.transform = 'translateY(-5px) scale(0.98)';
            }
        });

        card.addEventListener('mouseleave', function () {
            // Reset adjacent cards
            if (fpoCards[index - 1]) {
                fpoCards[index - 1].style.transform = 'translateY(0) scale(1)';
            }
            if (fpoCards[index + 1]) {
                fpoCards[index + 1].style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Animate connection lines on scroll
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                connectionLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.strokeDashoffset = '0';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    if (fpoIcon) {
        iconObserver.observe(fpoIcon);
    }
}

// Tooltip function
function showTooltip(element, message) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.fpo-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'fpo-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--color-molten-orange, #FF6B00);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        font-family: 'Outfit', sans-serif;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        white-space: nowrap;
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = element.getBoundingClientRect();
    const svgContainer = element.closest('svg').getBoundingClientRect();

    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;

    // Animate in
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-10px)';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
}

// Add parallax effect to FPO section
window.addEventListener('scroll', function () {
    const fpoSection = document.querySelector('.fpos-section');
    if (!fpoSection) return;

    const rect = fpoSection.getBoundingClientRect();
    const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

    if (scrollPercent > 0 && scrollPercent < 1) {
        const fpoIcon = document.querySelector('.fpo-icon-container');
        if (fpoIcon) {
            const translateY = (scrollPercent - 0.5) * 50;
            fpoIcon.style.transform = `translateY(${translateY}px)`;
        }
    }
});

// Add ripple effect on card click
document.querySelectorAll('.fpo-card').forEach(card => {
    card.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 107, 0, 0.3);
            transform: translate(-50%, -50%);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
