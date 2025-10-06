// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing Effect for Hero Subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #6a0dad'; // Cursor blink
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none'; // Remove cursor after typing
        }
    }
    type();
}

// Initialize Typing Effect after DOM Load
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        // Delay typing start for dramatic effect
        setTimeout(() => {
            typeWriter(typingText, typingText.textContent, 80);
        }, 500);
    }
});

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe Sections for Animation
document.querySelectorAll('.animate-section').forEach(section => {
    observer.observe(section);
});

// Stagger Animation for Feature Cards (in Features Section)
const animateCards = (selector, delayStep = 0.2) => {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * delayStep * 1000);
    });
};

// Trigger Stagger for Feature Cards when Section Visible
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate feature cards in features section
            if (entry.target.id === 'features') {
                setTimeout(() => animateCards('.feature-card', 0.3), 200);
            }
            entry.target.classList.add('animate');
            sectionObserver.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-section').forEach(section => {
    sectionObserver.observe(section);
});

// Particles Animation (Simple CSS-based, enhanced with JS for more particles)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = '';

    // Create multiple particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's'; // Vary speed
        particlesContainer.appendChild(particle);
    }
}

// Add CSS for particles dynamically (if not in CSS)
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: #6a0dad;
        border-radius: 50%;
        top: 100%;
        animation: float 6s infinite linear;
        opacity: 0.7;
    }
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize Particles after DOM Load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    // Recreate particles every 10 seconds for continuous effect
    setInterval(createParticles, 10000);
});

// Optional: Debug for Send Email Button (Remove after testing)
document.addEventListener('DOMContentLoaded', () => {
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', (e) => {
            console.log('Send Email button clicked successfully! Mailto should open.'); // Log for confirmation
        });
    }
});