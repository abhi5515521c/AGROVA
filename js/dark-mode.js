// ==========================================
// DARK MODE TOGGLE FUNCTIONALITY
// ==========================================

(function () {
    'use strict';

    // Get the toggle button
    const themeToggle = document.getElementById('theme-toggle');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Toggle theme function
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');

        // Save the preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);

        // Add animation effect
        themeToggle.style.transform = 'scale(0.9) rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);

        // Optional: Trigger a custom event for other scripts
        const themeChangeEvent = new CustomEvent('themeChange', {
            detail: { theme: theme }
        });
        document.dispatchEvent(themeChangeEvent);
    }

    // Add click event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);

        // Add keyboard support
        themeToggle.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

    // Optional: Add system preference detection
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // If no saved preference, use system preference
    if (!localStorage.getItem('theme')) {
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });

    // Add smooth transition on first load
    setTimeout(() => {
        document.body.style.transition = 'background 0.5s ease, color 0.5s ease';
    }, 100);

    console.log('🌓 Dark mode initialized. Current theme:', currentTheme);
})();
