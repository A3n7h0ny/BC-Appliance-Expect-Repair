 // === SCROLL ANIMATIONS ===
        const fadeElements = document.querySelectorAll('.fade-in');
        
        function checkFade() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkFade);
        window.addEventListener('load', checkFade);

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



            const slideshowData = [
        {
            src: 'images/Repair man.jpg',
            caption: 'Expert technicians repairing appliances across Joburg & Pretoria'
        },
        {
            src: 'images/fixing.jpeg',
            caption: 'Professional commercial appliance repair services'
        },
        {
            src: 'images/1777228297645.png',
            caption: 'We are prepared to come to you'
        },
        
    ];
    
    let currentIndex = 0;
    const img = document.getElementById('rotatingImage');
    const caption = document.getElementById('imageCaption');
    
    function changeImage() {
        currentIndex = (currentIndex + 1) % slideshowData.length;
        
        // Fade out
        img.style.opacity = '0';
        if (caption) caption.style.opacity = '0';
        
        setTimeout(() => {
            // Change image and caption
            img.src = slideshowData[currentIndex].src;
            if (caption) caption.textContent = slideshowData[currentIndex].caption;
            
            // Fade in
            img.style.opacity = '1';
            if (caption) caption.style.opacity = '1';
        }, 300);
    }
    
    // Change every 4 seconds
    setInterval(changeImage, 4000);
        })();



        