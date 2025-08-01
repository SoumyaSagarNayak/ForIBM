// Nature-Inspired Art Portfolio JavaScript

class ArtPortfolio {
    constructor() {
        this.userCount = 0;
        this.collections = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.initUserCount();
        this.initNavigation();
        this.initCollections();
        this.initProfileForm();
        this.initContactForm();
        this.initScrollAnimations();
        this.initSmoothScrolling();
        this.loadStoredProfile();
    }

    // User Count Functionality
    initUserCount() {
        // Get stored count or start from 0
        const storedCount = localStorage.getItem('artPortfolioUserCount');
        this.userCount = storedCount ? parseInt(storedCount) : Math.floor(Math.random() * 1000) + 500;
        
        // Increment count on page load
        this.userCount++;
        
        // Store updated count
        localStorage.setItem('artPortfolioUserCount', this.userCount.toString());
        
        // Update display
        this.updateUserCountDisplay();
        
        // Animate count up
        this.animateCountUp();
    }

    updateUserCountDisplay() {
        const userCountElement = document.getElementById('userCount');
        if (userCountElement) {
            userCountElement.textContent = this.userCount.toLocaleString();
        }
    }

    animateCountUp() {
        const userCountElement = document.getElementById('userCount');
        if (!userCountElement) return;

        const startCount = Math.max(0, this.userCount - 10);
        const endCount = this.userCount;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentCount = Math.floor(startCount + (endCount - startCount) * progress);
            userCountElement.textContent = currentCount.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Navigation Functionality
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const collectionsDropdown = document.getElementById('collectionsDropdown');
        const dropdownMenu = document.getElementById('dropdownMenu');

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Collections dropdown functionality
        if (collectionsDropdown && dropdownMenu) {
            // Handle dropdown items
            const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const collection = item.getAttribute('data-collection');
                    this.filterCollections(collection);
                    this.scrollToSection('collections');
                });
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Collections Functionality
    initCollections() {
        this.collections = [
            {
                id: 1,
                title: 'Forest Dreams',
                category: 'abstract',
                image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Abstract interpretation of forest landscapes'
            },
            {
                id: 2,
                title: 'Mountain Serenity',
                category: 'nature',
                image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Peaceful mountain photography'
            },
            {
                id: 3,
                title: 'Clean Lines',
                category: 'minimal',
                image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Minimalist design approach'
            },
            {
                id: 4,
                title: 'Nature Sketches',
                category: 'sketch',
                image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Hand-drawn nature illustrations'
            },
            {
                id: 5,
                title: 'Digital Wilderness',
                category: 'digital',
                image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Digital art inspired by wilderness'
            },
            {
                id: 6,
                title: 'Ocean Waves',
                category: 'abstract',
                image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Abstract ocean wave patterns'
            },
            {
                id: 7,
                title: 'Sunset Valley',
                category: 'nature',
                image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Golden hour valley photography'
            },
            {
                id: 8,
                title: 'Simple Forms',
                category: 'minimal',
                image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Geometric minimal compositions'
            },
            {
                id: 9,
                title: 'Botanical Studies',
                category: 'sketch',
                image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Detailed plant sketches'
            }
        ];

        this.renderCollections();
        this.initCollectionFilters();
    }

    renderCollections(filter = 'all') {
        const collectionsGrid = document.getElementById('collectionsGrid');
        if (!collectionsGrid) return;

        const filteredCollections = filter === 'all' 
            ? this.collections 
            : this.collections.filter(item => item.category === filter);

        collectionsGrid.innerHTML = filteredCollections.map(item => `
            <div class="collection-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="collection-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');

        // Add animation to new items
        const items = collectionsGrid.querySelectorAll('.collection-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    initCollectionFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value and apply
                const filter = button.getAttribute('data-filter');
                this.filterCollections(filter);
            });
        });
    }

    filterCollections(filter) {
        this.currentFilter = filter;
        this.renderCollections(filter);
        
        // Update active filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });
    }

    // Profile Form Functionality
    initProfileForm() {
        const profileForm = document.getElementById('profileForm');
        const profilePicture = document.getElementById('profilePicture');
        const imagePreview = document.getElementById('imagePreview');
        const profilePreview = document.getElementById('profilePreview');

        if (!profileForm) return;

        // Handle file upload preview
        if (profilePicture && imagePreview) {
            profilePicture.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
                        this.updateProfilePreview();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Handle form submission
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileSubmission();
        });

        // Real-time preview updates
        const nameInput = document.getElementById('artistName');
        const bioInput = document.getElementById('artistBio');

        if (nameInput) {
            nameInput.addEventListener('input', () => this.updateProfilePreview());
        }

        if (bioInput) {
            bioInput.addEventListener('input', () => this.updateProfilePreview());
        }
    }

    updateProfilePreview() {
        const nameInput = document.getElementById('artistName');
        const bioInput = document.getElementById('artistBio');
        const previewName = document.getElementById('previewName');
        const previewBio = document.getElementById('previewBio');
        const previewImage = document.getElementById('previewImage');
        const profilePreview = document.getElementById('profilePreview');

        if (!nameInput || !bioInput || !previewName || !previewBio) return;

        const name = nameInput.value.trim();
        const bio = bioInput.value.trim();

        if (name || bio) {
            profilePreview.style.display = 'block';
            previewName.textContent = name || 'Artist Name';
            previewBio.textContent = bio || 'Artist bio will appear here...';

            // Update preview image if available
            const imagePreview = document.getElementById('imagePreview');
            const img = imagePreview?.querySelector('img');
            if (img && previewImage) {
                previewImage.innerHTML = `<img src="${img.src}" alt="Profile Preview">`;
            }
        }
    }

    handleProfileSubmission() {
        const nameInput = document.getElementById('artistName');
        const bioInput = document.getElementById('artistBio');
        const profilePicture = document.getElementById('profilePicture');

        // Validate form
        if (!this.validateProfileForm()) {
            return;
        }

        // Create profile data
        const profileData = {
            name: nameInput.value.trim(),
            bio: bioInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Handle profile picture
        if (profilePicture.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileData.image = e.target.result;
                this.saveProfile(profileData);
            };
            reader.readAsDataURL(profilePicture.files[0]);
        } else {
            this.saveProfile(profileData);
        }
    }

    validateProfileForm() {
        const nameInput = document.getElementById('artistName');
        const bioInput = document.getElementById('artistBio');
        const nameError = document.getElementById('nameError');
        const bioError = document.getElementById('bioError');

        let isValid = true;

        // Clear previous errors
        nameError.textContent = '';
        bioError.textContent = '';

        // Validate name
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Artist name is required';
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters long';
            isValid = false;
        }

        // Validate bio
        if (!bioInput.value.trim()) {
            bioError.textContent = 'Artist bio is required';
            isValid = false;
        } else if (bioInput.value.trim().length < 20) {
            bioError.textContent = 'Bio must be at least 20 characters long';
            isValid = false;
        }

        return isValid;
    }

    saveProfile(profileData) {
        // Save to localStorage
        localStorage.setItem('artPortfolioProfile', JSON.stringify(profileData));

        // Show success message
        this.showProfileSuccess();

        // Reset form
        document.getElementById('profileForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
    }

    showProfileSuccess() {
        const profilePreview = document.getElementById('profilePreview');
        const successMessage = profilePreview.querySelector('.success-message');
        
        if (successMessage) {
            successMessage.style.display = 'flex';
            successMessage.style.animation = 'fadeIn 0.5s ease';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    }

    loadStoredProfile() {
        const storedProfile = localStorage.getItem('artPortfolioProfile');
        if (storedProfile) {
            const profileData = JSON.parse(storedProfile);
            const previewName = document.getElementById('previewName');
            const previewBio = document.getElementById('previewBio');
            const previewImage = document.getElementById('previewImage');
            const profilePreview = document.getElementById('profilePreview');

            if (previewName && previewBio && profilePreview) {
                previewName.textContent = profileData.name;
                previewBio.textContent = profileData.bio;
                
                if (profileData.image && previewImage) {
                    previewImage.innerHTML = `<img src="${profileData.image}" alt="Stored Profile">`;
                }
                
                profilePreview.style.display = 'block';
            }
        }
    }

    // Contact Form Functionality
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(e);
            });
        }
    }

    handleContactSubmission(e) {
        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('.submit-btn');
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            this.showContactSuccess();
            
            // Reset form
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showContactSuccess() {
        // Create and show success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully! We'll get back to you soon.</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 15px 20px;
            border-radius: var(--radius-medium);
            box-shadow: var(--shadow-medium);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }

    // Scroll Animations
    initScrollAnimations() {
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

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.art-type-card, .collection-item, .profile-card');
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        // Handle navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
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

    // Public API
    getUserCount() {
        return this.userCount;
    }

    getCollections() {
        return this.collections;
    }

    getCurrentFilter() {
        return this.currentFilter;
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
                    if (entry.entryType === 'layout-shift') {
                        this.metrics.cls = (this.metrics.cls || 0) + entry.value;
                    }
                }
            });

            try {
                observer.observe({ 
                    entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
                });
            } catch (e) {
                console.warn('Performance Observer not fully supported');
            }
        }
    }

    logMetrics() {
        const loadTime = performance.now() - this.startTime;
        console.log('Art Portfolio Performance Metrics:', {
            loadTime: `${loadTime.toFixed(2)}ms`,
            lcp: this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'N/A',
            fid: this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'N/A',
            cls: this.metrics.cls ? this.metrics.cls.toFixed(4) : 'N/A'
        });
    }
}

// Accessibility Helper
class AccessibilityHelper {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    setupKeyboardNavigation() {
        // Handle escape key for dropdowns and modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('navMenu');
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });

        // Handle tab navigation for dropdown menus
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' && dropdownItems[index + 1]) {
                    e.preventDefault();
                    dropdownItems[index + 1].focus();
                } else if (e.key === 'ArrowUp' && dropdownItems[index - 1]) {
                    e.preventDefault();
                    dropdownItems[index - 1].focus();
                }
            });
        });
    }

    setupFocusManagement() {
        // Ensure focus is visible for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupAriaLabels() {
        // Add aria-labels to interactive elements that might need them
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            if (!link.getAttribute('aria-label')) {
                const icon = link.querySelector('i');
                if (icon) {
                    const platform = icon.className.split('-').pop();
                    link.setAttribute('aria-label', `Visit our ${platform} page`);
                }
            }
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    const artPortfolio = new ArtPortfolio();
    
    // Initialize performance monitoring
    const performanceMonitor = new PerformanceMonitor();
    
    // Initialize accessibility helper
    const accessibilityHelper = new AccessibilityHelper();
    
    // Make portfolio globally available for debugging
    window.ArtPortfolio = artPortfolio;
    
    // Log performance metrics after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            performanceMonitor.logMetrics();
        }, 1000);
    });
    
    console.log('🎨 Art Portfolio initialized successfully!');
});

// Global utility functions
window.scrollToSection = function(sectionId) {
    if (window.ArtPortfolio) {
        window.ArtPortfolio.scrollToSection(sectionId);
    }
};

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
    console.error('Art Portfolio Error:', e.error);
    // Could send to error reporting service in production
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Art Portfolio Unhandled Promise Rejection:', e.reason);
    // Could send to error reporting service in production
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--forest-dark) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ArtPortfolio, PerformanceMonitor, AccessibilityHelper };
}