// Hide Loader after page load
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Fade out duration
        }, 2000); // Delay before starting fade out
    }
});

// Typing Effect for Hero Subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
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

// Initialize typing effect after DOM load
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        typeWriter(typingText, typingText.textContent, 80);
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
}

// Smooth Scrolling
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

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        }
    });
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

// Observe sections for animation
document.querySelectorAll('.animate-section').forEach(section => {
    observer.observe(section);
});

// Stagger animation for skill cards and project cards
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

// Trigger stagger animation when sections become visible
document.querySelectorAll('.animate-section').forEach(section => {
    const sectionObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger for skills in about section
                if (entry.target.id === 'about') {
                    setTimeout(() => animateCards('.skill-card', 0.3), 200);
                }
                // Stagger for projects in projects section
                else if (entry.target.id === 'projects') {
                    setTimeout(() => animateCards('.project-card', 0.2), 200);
                }
                entry.target.classList.add('animate');
                sectionObserver.unobserve(entry.target); // Animate only once
            }
        });
    };
    const sectionObserver = new IntersectionObserver(sectionObserverCallback, observerOptions);
    sectionObserver.observe(section);
});

// Modal for Projects (Handles external links and internal modals)
const modals = document.querySelectorAll('.modal');
const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If the link has an external href (not "#"), open it in a new tab
        if (href && href !== '#') {
            e.preventDefault();
            window.open(href, '_blank');
            return; // Skip modal logic
        }
        
        // If href="#", open the modal as usual
        e.preventDefault();
        const projectCard = link.closest('.project-card');
        if (projectCard) {
            const modalId = projectCard.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        }
    });
});

// Close modal
modals.forEach(modal => {
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Close if clicked outside modal content
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Subtle Parallax for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Progress bars animation when scrolling to skills section
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progresses = entry.target.querySelectorAll('.progress');
            progresses.forEach(progress => {
                // Re-apply width to trigger CSS animation
                progress.style.width = progress.style.width; 
            });
            progressObserver.unobserve(entry.target); // Observe only once
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-grid').forEach(grid => {
    progressObserver.observe(grid);
});