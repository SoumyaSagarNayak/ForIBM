// RAWrSync Website JavaScript
// Enhanced with modern features and smooth interactions

class RAWrSyncApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupCarousel();
        this.setupMobileMenu();
        this.setupCollectionsDropdown();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupResponsiveHandling();
        this.setupLoadingStates();
    }

    // Image Carousel for Hero Section
    setupCarousel() {
        let slideIndex = 0;
        const slides = document.getElementsByClassName("mySlides");
        
        if (slides.length === 0) return;

        const showSlide = (index) => {
            // Hide all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                slides[i].classList.remove('w3-animate-top', 'w3-animate-bottom');
            }
            
            // Show current slide with animation
            if (slides[index]) {
                slides[index].style.display = "block";
                slides[index].classList.add(index % 2 === 0 ? 'w3-animate-top' : 'w3-animate-bottom');
            }
        };

        const nextSlide = () => {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
        };

        // Initialize first slide
        showSlide(slideIndex);
        
        // Auto-advance slides every 4 seconds
        setInterval(nextSlide, 4000);

        // Add pause on hover
        const carouselContainer = document.querySelector('.sliding');
        if (carouselContainer) {
            let carouselInterval = setInterval(nextSlide, 4000);
            
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(nextSlide, 4000);
            });
        }
    }

    // Mobile Menu Functionality
    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const menuInput = menuToggle?.querySelector('input[type="checkbox"]');
        const menu = document.getElementById('menu');
        const menuOverlay = document.getElementById('menuOverlay');

        if (!menuToggle || !menuInput || !menu) return;

        // Close menu when clicking on overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                menuInput.checked = false;
            });
        }

        // Close menu when clicking on menu items
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuInput.checked = false;
            });
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuInput.checked) {
                menuInput.checked = false;
            }
        });
    }

    // Collections Dropdown
    setupCollectionsDropdown() {
        const collectionsDropdown = document.querySelector('.collections .dots');
        const cursor = document.querySelector('.cursor');

        if (!collectionsDropdown) return;

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!collectionsDropdown.contains(e.target) && !cursor?.contains(e.target)) {
                collectionsDropdown.classList.remove('active');
            }
        });

        // Handle escape key for dropdown
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && collectionsDropdown.classList.contains('active')) {
                collectionsDropdown.classList.remove('active');
            }
        });

        // Add keyboard navigation
        const dropdownItems = collectionsDropdown.querySelectorAll('.list li');
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' && dropdownItems[index + 1]) {
                    dropdownItems[index + 1].focus();
                } else if (e.key === 'ArrowUp' && dropdownItems[index - 1]) {
                    dropdownItems[index - 1].focus();
                }
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#404') return; // Skip 404 links
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.creator-card, .home-collection, .about-description, .about-description-image');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Add CSS for animations
        this.addAnimationStyles();
    }

    // Add Animation Styles Dynamically
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .creator-card,
            .home-collection,
            .about-description,
            .about-description-image {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .creator-card:nth-child(even) {
                transform: translateY(30px) translateX(-20px);
            }
            
            .creator-card:nth-child(odd) {
                transform: translateY(30px) translateX(20px);
            }
            
            .animate-in.creator-card {
                transform: translateY(0) translateX(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Responsive Handling
    setupResponsiveHandling() {
        const handleResize = () => {
            const navbar = document.querySelector('.navbar-navigations');
            const mobileMenu = document.getElementById('menuToggle');
            
            if (window.innerWidth <= 880) {
                if (navbar) navbar.style.display = 'none';
                if (mobileMenu) mobileMenu.style.display = 'block';
            } else {
                if (navbar) navbar.style.display = 'flex';
                if (mobileMenu) mobileMenu.style.display = 'none';
                
                // Close mobile menu if open
                const menuInput = mobileMenu?.querySelector('input[type="checkbox"]');
                if (menuInput) menuInput.checked = false;
            }
        };

        // Initial check
        handleResize();
        
        // Listen for resize events with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 150);
        });
    }

    // Loading States and Performance
    setupLoadingStates() {
        // Add loading states for images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                
                img.addEventListener('error', () => {
                    img.classList.add('error');
                    // Fallback image or placeholder
                    console.warn('Failed to load image:', img.src);
                });
            }
        });

        // Add loading styles
        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            img {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            img.loaded {
                opacity: 1;
            }
            
            img.error {
                opacity: 0.5;
                filter: grayscale(100%);
            }
        `;
        document.head.appendChild(loadingStyle);
    }

    // Utility Methods
    debounce(func, wait) {
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

    // Public API for external interactions
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    toggleCollectionsDropdown() {
        const dropdown = document.querySelector('.collections .dots');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
    }
}

// Enhanced Touch Support for Mobile
class TouchHandler {
    constructor() {
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        // Add touch feedback for interactive elements
        const touchElements = document.querySelectorAll('.creator-card, .home-collection, .action-badge, .social-badge');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        });
    }

    handleTouchStart(e) {
        e.currentTarget.classList.add('touch-active');
    }

    handleTouchEnd(e) {
        setTimeout(() => {
            e.currentTarget.classList.remove('touch-active');
        }, 150);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.startTime = performance.now();
        this.setupPerformanceObserver();
    }

    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.metrics.lcp = entry.startTime;
                    }
                    if (entry.entryType === 'first-input') {
                        this.metrics.fid = entry.processingStart - entry.startTime;
                    }
                }
            });

            try {
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
            } catch (e) {
                console.warn('Performance Observer not fully supported');
            }
        }
    }

    logMetrics() {
        const loadTime = performance.now() - this.startTime;
        console.log('RAWrSync Performance Metrics:', {
            loadTime: `${loadTime.toFixed(2)}ms`,
            ...this.metrics
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    const app = new RAWrSyncApp();
    
    // Initialize touch handler for mobile
    const touchHandler = new TouchHandler();
    
    // Initialize performance monitoring
    const performanceMonitor = new PerformanceMonitor();
    
    // Log performance metrics after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            performanceMonitor.logMetrics();
        }, 1000);
    });

    // Make app globally available for debugging
    window.RAWrSyncApp = app;
    
    console.log('RAWrSync application initialized successfully! 🚀');
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('RAWrSync Error:', e.error);
    // Could send to error reporting service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('RAWrSync Unhandled Promise Rejection:', e.reason);
    // Could send to error reporting service
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RAWrSyncApp, TouchHandler, PerformanceMonitor };
}