// ========================================
// ProFix Appliance Repair - Simple JS
// ========================================

// Testimonials Data
const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Homeowner',
        image: 'images/avatar-1.jpg',
        text: 'ProFix saved the day! My refrigerator stopped working on a Sunday, and they had a technician at my door within 2 hours. Professional, fast, and fairly priced. Highly recommend!',
        service: 'Refrigerator Repair'
    },
    {
        name: 'Michael Chen',
        role: 'Property Manager',
        image: 'images/avatar-2.jpg',
        text: 'As a property manager, I need reliable contractors. ProFix has been my go-to for appliance repairs for 3 years now. Their technicians are always on time and do quality work.',
        service: 'Multiple Appliances'
    },
    {
        name: 'Emily Rodriguez',
        role: 'Homeowner',
        image: 'images/avatar-3.jpg',
        text: 'My washing machine was making a terrible noise. The ProFix technician diagnosed the issue quickly, had the parts in his van, and fixed it right away. Great service!',
        service: 'Washing Machine Repair'
    }
];

// Current testimonial index
let currentTestimonial = 0;

// DOM Elements
const testimonialText = document.getElementById('testimonialText');
const testimonialName = document.getElementById('testimonialName');
const testimonialRole = document.getElementById('testimonialRole');
const testimonialImage = document.getElementById('testimonialImage');
const testimonialService = document.getElementById('testimonialService');
const testimonialDots = document.getElementById('testimonialDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const navbar = document.getElementById('navbar');

// ========================================
// Testimonial Slider
// ========================================

function updateTestimonial(index) {
    const testimonial = testimonials[index];
    
    // Fade out
    testimonialText.style.opacity = '0';
    testimonialName.style.opacity = '0';
    testimonialRole.style.opacity = '0';
    testimonialImage.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        testimonialText.textContent = `"${testimonial.text}"`;
        testimonialName.textContent = testimonial.name;
        testimonialRole.textContent = testimonial.role;
        testimonialImage.src = testimonial.image;
        testimonialImage.alt = testimonial.name;
        testimonialService.textContent = testimonial.service;
        
        // Fade in
        testimonialText.style.opacity = '1';
        testimonialName.style.opacity = '1';
        testimonialRole.style.opacity = '1';
        testimonialImage.style.opacity = '1';
    }, 200);
    
    // Update dots
    const dots = testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestimonial);
}

// Event listeners for testimonial navigation
if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

// Dot navigation
if (testimonialDots) {
    testimonialDots.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonial(currentTestimonial);
        });
    });
}

// Auto-play testimonials
setInterval(nextTestimonial, 6000);

// ========================================
// Mobile Menu
// ========================================

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (mobileMenuBtn && navLinks) {
    // Toggle menu on hamburger click
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize (if going to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// ========================================
// Contact Form
// ========================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide form, show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 3000);
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (navbar) {
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Animations (Simple Fade In)
// ========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .process-card, .stat-item, .value-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ========================================
// Add transition styles for testimonial
// ========================================

if (testimonialText) {
    testimonialText.style.transition = 'opacity 0.2s ease';
}
if (testimonialName) {
    testimonialName.style.transition = 'opacity 0.2s ease';
}
if (testimonialRole) {
    testimonialRole.style.transition = 'opacity 0.2s ease';
}
if (testimonialImage) {
    testimonialImage.style.transition = 'opacity 0.2s ease';
}

// ========================================
// Console greeting
// ========================================

console.log('%c ProFix Appliance Repair ', 'background: #0073e6; color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
console.log('%c Website built with HTML, CSS & JavaScript ', 'color: #666; font-size: 14px;');
