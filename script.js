// Enhanced Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeParticles();
    initializeSmoothScrolling();
    initializeFormHandling();
    initializeSkillBars();
    initializeIntersectionObserver();
    initializeThemeToggle();
    initializeMagneticButtons();
});

// Enhanced Navigation with Glassmorphism and Touch Support
function initializeNavigation() {
    const nav = document.querySelector('.glass-nav, .professional-nav, nav');
    const mobileMenuButton = document.querySelector('.mobile-menu-button, #mobileMenuBtn');
    const mobileMenu = document.querySelector('.mobile-menu, #mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu a');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // Enhanced mobile menu toggle with touch support
    if (mobileMenuButton && mobileMenu) {
        // Handle both click and touch events
        const toggleMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenuButton.classList.add('active');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
            }
            
            // Animate hamburger menu
            const lines = mobileMenuButton.querySelectorAll('.line, span');
            lines.forEach(line => line.classList.toggle('active'));
            
            // Prevent body scroll when menu is open
            if (isHidden) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };
        
        mobileMenuButton.addEventListener('click', toggleMenu);
        mobileMenuButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMenu(e);
        }, { passive: false });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            const closeMenu = (e) => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
                document.body.style.overflow = '';
                const lines = mobileMenuButton.querySelectorAll('.line, span');
                lines.forEach(line => line.classList.remove('active'));
            };
            
            link.addEventListener('click', closeMenu);
            link.addEventListener('touchend', closeMenu);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Add swipe gesture support for mobile menu
    if ('ontouchstart' in window && mobileMenu) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        mobileMenu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        mobileMenu.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swiped left - close menu
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
}

// Enhanced Animation System
function initializeAnimations() {
    // Typing animation for hero text
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '3px solid #667eea';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    typingElement.style.borderColor = typingElement.style.borderColor === 'transparent' ? '#667eea' : 'transparent';
                }, 750);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Floating shapes animation enhancement
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 4;
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
    });
}

// Enhanced Particle System with Responsive Support
function initializeParticles() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;
    
    // Check if mobile device
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Adjust particle count based on device
    const particleInterval = isMobile ? 600 : isTablet ? 400 : 200;
    const initialParticles = isMobile ? 5 : isTablet ? 10 : 20;

    function createParticle() {
        // Don't create particles on mobile to save performance
        if (window.innerWidth < 768) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and properties
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const duration = 8 + Math.random() * 8;
        const size = (isMobile ? 1 : 2) + Math.random() * (isMobile ? 2 : 4);
        const opacity = 0.3 + Math.random() * 0.7;
        
        particle.style.left = startX + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = opacity;
        particle.style.animationDuration = duration + 's';
        
        // Gradient colors for particles
        const colors = [
            'rgba(103, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(240, 147, 251, 0.8)',
            'rgba(245, 87, 108, 0.8)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }

    // Create particles continuously with device-appropriate interval
    const particleIntervalId = setInterval(createParticle, particleInterval);
    
    // Initial burst of particles (device-appropriate amount)
    for (let i = 0; i < initialParticles; i++) {
        setTimeout(createParticle, i * 100);
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(particleIntervalId);
    });
}

// Enhanced Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const navHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active navigation link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Enhanced Form Handling
function initializeFormHandling() {
    const contactForm = document.querySelector('#contact-form');
    const newsletterForm = document.querySelector('footer form');

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (validateForm(data)) {
                // Simulate form submission
                showFormSuccess('Message sent successfully!');
                this.reset();
            }
        });
    }

    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                showFormSuccess('Successfully subscribed to newsletter!');
                this.reset();
            } else {
                showFormError('Please enter a valid email address.');
            }
        });
    }
}

// Form validation helpers
function validateForm(data) {
    if (!data.name || data.name.length < 2) {
        showFormError('Please enter a valid name.');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showFormError('Please enter a valid email address.');
        return false;
    }
    
    if (!data.message || data.message.length < 10) {
        showFormError('Please enter a message with at least 10 characters.');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccess(message) {
    showFormMessage(message, 'success');
}

function showFormError(message) {
    showFormMessage(message, 'error');
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message fixed top-4 right-4 px-6 py-4 rounded-lg text-white font-semibold z-50 transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Enhanced Skill Progress Bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const animateSkillBar = (bar) => {
        const percentage = bar.getAttribute('data-percentage') || '0';
        const progressFill = bar.querySelector('.progress-fill');
        
        if (progressFill) {
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.width = percentage + '%';
            }, 500);
        }
    };

    // Use intersection observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Enhanced Intersection Observer for Scroll Animations
function initializeIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    let isDark = false;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        
        if (isDark) {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDark = true;
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Magnetic Button Effects
function initializeMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic, .btn-glow, .social-icon');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Window scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.parallax');
    const speed = 0.5;

    parallax.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Resize handler for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    // Debounce resize events for better performance
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        handleResponsiveAdjustments();
    }, 250);
});

// Handle responsive adjustments based on screen size
function handleResponsiveAdjustments() {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;
    const isDesktop = screenWidth >= 1024;
    
    // Recalculate particle system
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (isMobile) {
            particle.style.display = 'none'; // Hide particles on mobile for performance
        } else {
            particle.style.display = 'block';
            // Reduce particle count on tablet
            if (isTablet) {
                const particleIndex = Array.from(particles).indexOf(particle);
                if (particleIndex % 2 === 0) {
                    particle.style.display = 'none';
                }
            }
        }
    });
    
    // Adjust animations based on device
    const animatedElements = document.querySelectorAll('[class*="animate"]');
    if (isMobile && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    // Adjust typing speed on mobile
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement && isMobile) {
        typingElement.style.animationDuration = '1s'; // Faster on mobile
    }
    
    // Adjust hover effects for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        // Disable hover effects on touch devices
        const hoverElements = document.querySelectorAll('[class*="hover:"]');
        hoverElements.forEach(el => {
            el.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
            });
            el.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
    
    console.log(`Responsive adjustments applied for ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'} view`);
}

// Call on page load
handleResponsiveAdjustments();

// Initialize performance monitoring
function initializePerformanceMonitoring() {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Lazy load non-critical animations
            console.log('Portfolio loaded successfully with enhanced features!');
        });
    }
}

// Call performance monitoring
initializePerformanceMonitoring();
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Update active navigation item based on scroll position
    window.addEventListener('scroll', updateActiveNavItem);
}

// Update active navigation item
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const navHeight = document.querySelector('nav').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-semibold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary', 'font-semibold');
        }
    });
}

// Form handling
function initializeFormHandling() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="spinner mx-auto"></div>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transform translate-x-full transition-transform duration-300`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500');
    } else {
        notification.classList.add('bg-blue-500');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize skill progress bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize particle background
function initializeParticles() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 6;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
}

// Initialize intersection observer for scroll animations
function initializeIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.card-hover, .skill-card, .project-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Utility functions
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
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
    }
});

// Add scroll effect to navigation
window.addEventListener('scroll', throttle(() => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('bg-white', 'shadow-lg');
        nav.classList.remove('bg-transparent');
    } else {
        nav.classList.remove('bg-white', 'shadow-lg');
        nav.classList.add('bg-transparent');
    }
}, 100));

// Initialize theme toggle (if needed)
function initializeThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
