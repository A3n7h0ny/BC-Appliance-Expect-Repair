// ========================================
// BS Appliance Repair - Simple JS
// ========================================

// Testimonials Data
 // Your exact SVG star HTML function
    function getStarHtml(filled = true) {
        const fillColor = filled ? '#FFC107' : '#e0e0e0';
        return `
            <svg class="star-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="${fillColor}"/>
            </svg>`;
    }

    // Get a full row of 5 stars (for review cards)
    function getStarsRow(rating = 5) {
        let starsHtml = '<div class="star-container">';
        for (let i = 0; i < 5; i++) {
            starsHtml += getStarHtml(i < rating);
        }
        starsHtml += '</div>';
        return starsHtml;
    }

    // Generate header stars (4.8 rating = 4 full stars + 1 half star)
   function getHeaderStars() {
    const container = document.getElementById('headerStars');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 4 full gold stars
    for (let i = 0; i < 4; i++) {
        const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        star.setAttribute("class", "star-icon-header filled");
        star.setAttribute("viewBox", "0 0 24 24");
        star.innerHTML = '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fbbc05"/>';
        container.appendChild(star);
    }
    
    // Half star (left side gold, right side grey)
    const halfStar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    halfStar.setAttribute("class", "star-icon-header filled");
    halfStar.setAttribute("viewBox", "0 0 24 24");
    halfStar.innerHTML = `
        <defs>
            <clipPath id="halfClip">
                <rect x="0" y="0" width="12" height="24"/>
            </clipPath>
        </defs>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#e0e0e0"/>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fbbc05" clip-path="url(#halfClip)"/>
    `;
    container.appendChild(halfStar);
}

function getTimeAgo(dateString) {
    const reviewDate = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 21) return "2 weeks ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

    // Real customer reviews data
    const reviewsData = [
        {
            name: "JESSY T channel ",
            text: "They solve my problem nicely, good service and quick",
            actualDate: "2026-04-05",
            rating: 5,
            avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVOSlIKpDcrgBi0TaxNVRpDXv0SKcHJeCwDvKXjjDuA5VSORgQL=s36-c-rp-mo-br100",
            googleReviewUrl: "https://maps.app.goo.gl/Sp9huEGGNBiJRs8V7"
        },
        {
            name: "Poulo Trading",
            text: "As a property owner, I need reliable contractors, BS Appliance Expect Repairs has been my to go for Appliance for 3 years now. The technicians are always on time and do quality work.",
            actualDate: "2026-04-12",
            rating: 5,
            avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVtGjKqXHHrpx-WF5V7VOasPVgBoFjrTBCgazW056LQT-Xsqj8=s36-c-rp-mo-br100",
            googleReviewUrl: "https://maps.app.goo.gl/YAN74ruSXE9xUgLe8"
        },
         {
            name: "Peter Magalefa",
            text: "Very good with their service",
            actualDate: "2026-04-27",
            rating: 5,
            avatar: "https://lh3.googleusercontent.com/a/ACg8ocJxsmiAxodS-h4JMe052Kh9fyZXBqrl6KfswUirpmo-V-Zohg=w36-h36-p-rp-mo-br100",
            googleReviewUrl: "https://maps.app.goo.gl/BLfBaHoQuz7JfikR7"
        },
        {
            name: "Elton Dube",
            text: "Good repair service",
            actualDate: "2026-04-27",
            rating: 5,
            avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVC0PiHQYQujr-MYQ7y1HW6R8Rg0nw_doPf8julyvp1vPgtnAqi=w36-h36-p-rp-mo-br100",
            googleReviewUrl: "https://maps.app.goo.gl/UpEvCiCoGrtN6Qe27"
        },
       
    ];

    

    let showAll = false;
    const reviewsFeed = document.getElementById('reviewsFeed');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const reviewBtn = document.getElementById('reviewBtn');

    // Update Google Review Button with actual place ID
    function updateGoogleReviewLink() {
    // Use the actual review link you get from your Google Business Profile
    // Replace this URL with the one you copied from "Get more reviews"
    const reviewLink = "https://g.page/r/CXrZojCwtyw8ECE/review";
    reviewBtn.href = reviewLink;
}

    // Generate review cards using your exact star HTML
    function renderReviews() {
        const reviewsToShow = showAll ? reviewsData : reviewsData.slice(0, 3);
        
        reviewsFeed.innerHTML = '';
        
        reviewsToShow.forEach((review, index) => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.style.animationDelay = `${index * 0.05}s`;
            
            // Using your exact getStarsRow() function
            const starsHtml = getStarsRow(review.rating);
            
            card.innerHTML = `
                ${starsHtml}
                <p class="review-text">"${review.text}"</p>
                <div class="reviewer-section">
                    <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                    <div class="reviewer-info">
                        <div class="name-row">
                            <a href="${review.googleReviewUrl}" target="_blank" class="reviewer-name">${review.name}</a>
                            <div class="verified-tick">
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.6">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span class="tooltip">Verified Customer</span>
                            </div>
                        </div>
                        <div class="review-date">${getTimeAgo(review.actualDate)}</div>
                    </div>
                </div>
                <div class="google-attribution">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Posted on Google Maps</span>
                </div>
            `;
            
            reviewsFeed.appendChild(card);
        });
        
        viewMoreBtn.textContent = showAll ? 'Show less reviews' : 'View more reviews';
    }

    // Toggle view more/less
    function toggleReviews() {
        showAll = !showAll;
        renderReviews();
    }

    // Initialize header stars
    getHeaderStars();
    
    // Update Google review link
    updateGoogleReviewLink();
    
    // Initial render
    renderReviews();
    
    // Event listeners
    viewMoreBtn.addEventListener('click', toggleReviews);

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
// Console greeting
// ========================================

console.log('%c ProFix Appliance Repair ', 'background: #0073e6; color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
console.log('%c Website built with HTML, CSS & JavaScript ', 'color: #666; font-size: 14px;');



// ========================================
// WhatsApp float
//=========================================



 (function() {
            // ----- DOM elements -----
            const hubWrapper = document.getElementById('floatingHub');
            const mainFab = document.getElementById('mainFab');
            const contactMenu = document.getElementById('contactMenu');
            const reminderPopup = document.getElementById('reminderPopup');
            const closeReminderBtn = document.getElementById('closeReminderBtn');
            
            let menuOpen = false;
            let reminderIntervalId = null;
            let reminderVisible = false;
            let hoverTimeout = null;

            // Helper: open menu (WhatsApp, Email, Call appear upwards)
            function openMenu() {
                if (!hubWrapper) return;
                hubWrapper.classList.add('active');
                menuOpen = true;
                // whenever menu opens, hide popup reminder if visible (to avoid overlap)
                hideReminderPopup();
            }

            function closeMenu() {
                if (!hubWrapper) return;
                hubWrapper.classList.remove('active');
                menuOpen = false;
            }

            function toggleMenu() {
                if (menuOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            }

            // ----- POPUP REMINDER logic (every 2 min OR on hover) -----
            function showReminderPopup() {
                if (!reminderPopup) return;
                // don't show if menu is already open (avoids conflict)
                if (menuOpen) return;
                // if already visible, ignore
                if (reminderVisible) return;
                reminderPopup.classList.add('show');
                reminderVisible = true;
                
                // auto-hide after 8 seconds (so it doesn't stay forever)
                setTimeout(() => {
                    if (reminderVisible) {
                        hideReminderPopup();
                    }
                }, 8000);
            }

            function hideReminderPopup() {
                if (reminderPopup) {
                    reminderPopup.classList.remove('show');
                    reminderVisible = false;
                }
            }

            // Show reminder on hover of main floating button (desktop & touch devices: hover works)
            if (mainFab) {
                mainFab.addEventListener('mouseenter', () => {
                    // clear any pending auto hide timer? we just show reminder, but avoid spamming
                    if (!menuOpen && !reminderVisible) {
                        showReminderPopup();
                    }
                    // reset any previous hover timeout
                    if (hoverTimeout) clearTimeout(hoverTimeout);
                });
                // optional: if mouse leaves, we do NOT auto-hide immediately (user might want to click)
                // but we keep standard behaviour.
            }

            // Every 2 minutes (120000 ms) show popup reminder
            function startReminderTimer() {
                if (reminderIntervalId) clearInterval(reminderIntervalId);
                reminderIntervalId = setInterval(() => {
                    // Only show if menu is closed & reminder not already visible & popup exists
                    if (!menuOpen && !reminderVisible) {
                        showReminderPopup();
                    }
                }, 120000); // exactly 2 minutes
            }

            // stop timer (if needed, but we keep it always alive)
            function stopReminderTimer() {
                if (reminderIntervalId) {
                    clearInterval(reminderIntervalId);
                    reminderIntervalId = null;
                }
            }

            // When user clicks the reminder popup -> open contact menu & hide popup
            if (reminderPopup) {
                reminderPopup.addEventListener('click', (e) => {
                    // prevent closing if user clicks on the close span specifically
                    if (e.target.classList && e.target.classList.contains('reminder-close')) {
                        e.stopPropagation();
                        hideReminderPopup();
                        return;
                    }
                    // open the contact hub menu (WhatsApp, Email, Call)
                    if (!menuOpen) {
                        openMenu();
                    } else {
                        closeMenu();
                    }
                    hideReminderPopup();
                });
            }

            if (closeReminderBtn) {
                closeReminderBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    hideReminderPopup();
                });
            }

            // MAIN FAB click: toggle menu (WhatsApp, Email, Call)
            if (mainFab) {
                mainFab.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMenu();
                    // whenever user manually toggles, hide popup reminder if visible
                    if (reminderVisible) hideReminderPopup();
                });
            }

            // Optional: close menu if clicking outside the hub (better UX)
            document.addEventListener('click', function(event) {
                if (!hubWrapper) return;
                const isClickInside = hubWrapper.contains(event.target);
                if (!isClickInside && menuOpen) {
                    closeMenu();
                }
            });

            // ESC key closes menu
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && menuOpen) {
                    closeMenu();
                }
            });

            // When any contact option is clicked (WhatsApp, Email, Call) close menu after short delay
            const allOptions = document.querySelectorAll('.contact-action-btn');
            allOptions.forEach(opt => {
                opt.addEventListener('click', function() {
                    setTimeout(() => {
                        if (menuOpen) closeMenu();
                    }, 200);
                });
            });

            // Also hide reminder when menu opens (redundant but safe)
            const originalOpen = openMenu;
            window.openMenu = function() {
                if (reminderVisible) hideReminderPopup();
                originalOpen();
            };
            openMenu = function() {
                if (reminderVisible) hideReminderPopup();
                originalOpen();
            };
            // rebind toggle to use updated open/close
            const newToggle = function() {
                if (menuOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            };
            if (mainFab) {
                // replace event to be safe from duplicate
                const newFab = mainFab.cloneNode(true);
                mainFab.parentNode.replaceChild(newFab, mainFab);
                const freshFab = document.getElementById('mainFab');
                if (freshFab) {
                    freshFab.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (hubWrapper.classList.contains('active')) {
                            hubWrapper.classList.remove('active');
                            menuOpen = false;
                        } else {
                            hubWrapper.classList.add('active');
                            menuOpen = true;
                            if (reminderVisible) hideReminderPopup();
                        }
                    });
                    // reattach hover event for reminder on fresh button
                    freshFab.addEventListener('mouseenter', () => {
                        if (!menuOpen && !reminderVisible) showReminderPopup();
                    });
                }
            }
            
            // Start the 2-minute reminder cycle
            startReminderTimer();

            // For debugging / clean up not needed. Keep timer alive.
            // Also show first reminder after 15 seconds (not too aggressive) but not required but nice.
            setTimeout(() => {
                if (!menuOpen && !reminderVisible) {
                    showReminderPopup();
                }
            }, 15000); // first pop after 15 secs to greet user, then every 2 min.
        })();