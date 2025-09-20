document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .feature-card, .gallery-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(106, 17, 203, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- Particle Background ---
    const particlesContainer = document.getElementById('particles');
    const numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        let size = Math.random() * 10 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const currentTheme = localStorage.getItem('theme') || 'light';

        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }

        setTheme(currentTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // --- Scroll Reveal Animation ---
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial check
    handleScrollAnimation();

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'var(--card-bg)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    }

    // --- Music Toggle ---
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('background-music');
    const musicIcon = musicToggle.querySelector('i');

    let hasInteracted = false;

    if (musicToggle && backgroundMusic) {
        // La música no se reproducirá hasta la primera interacción del usuario.
        const playMusicOnFirstInteraction = () => {
            if (!hasInteracted) {
                backgroundMusic.play().catch(e => console.error("Error al reproducir música:", e));
                hasInteracted = true;
                // Elimina el listener para que no se ejecute de nuevo.
                document.body.removeEventListener('click', playMusicOnFirstInteraction);
            }
        };
        document.body.addEventListener('click', playMusicOnFirstInteraction);

        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            } else {
                backgroundMusic.pause();
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            }
        });
    }
});