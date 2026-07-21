// ========================================
// BS Appliance Repair — script.js
// ========================================

// ── DOM refs ──────────────────────────────
const navbar      = document.getElementById('navbar');
const navLinks    = document.getElementById('navLinks');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// ========================================
// CONTACT FORM — Netlify Forms handler
// ========================================
// HOW IT WORKS:
//   • Netlify detects the data-netlify="true" attribute on the <form> at build time
//   • On submit we POST the form data via fetch (no page reload)
//   • Netlify emails you at the address set in Site Settings → Forms → Notifications
//   • FREE on Netlify — 100 submissions/month on the free plan
//
// SETUP STEPS (one-time, after deploy):
//   1. Deploy to Netlify (it auto-detects the form)
//   2. Go to Netlify dashboard → your site → Forms tab — you'll see "contactForm" listed
//   3. Click "Form notifications" → add your email (bs.aerepair@gmail.com)
//   4. Done — every submission lands in your inbox + the Netlify Forms dashboard

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending… <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                // Success
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';

                // Reset after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    successMessage.style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 5000);
            } else {
                throw new Error('Server error ' + response.status);
            }
        } catch (err) {
            // Fallback — open mailto if Netlify fetch fails (e.g. local dev)
            console.warn('Netlify form post failed, falling back to mailto:', err);
            const name    = formData.get('name') || '';
            const phone   = formData.get('phone') || '';
            const email   = formData.get('email') || '';
            const message = formData.get('message') || '';
            const body = encodeURIComponent(
                `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
            );
            window.location.href = `mailto:bs.aerepair@gmail.com?subject=Repair%20Booking%20Request%20from%20${encodeURIComponent(name)}&body=${body}`;

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// ========================================
// Testimonials / Reviews widget
// ========================================

function getStarHtml(filled = true) {
    const fillColor = filled ? '#FFC107' : '#e0e0e0';
    return `<svg class="star-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="${fillColor}"/>
    </svg>`;
}

function getStarsRow(rating = 5) {
    let html = '<div class="star-container">';
    for (let i = 0; i < 5; i++) html += getStarHtml(i < rating);
    html += '</div>';
    return html;
}

function getHeaderStars() {
    const container = document.getElementById('headerStars');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        star.setAttribute('class', 'star-icon-header filled');
        star.setAttribute('viewBox', '0 0 24 24');
        star.innerHTML = '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fbbc05"/>';
        container.appendChild(star);
    }
    const halfStar = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    halfStar.setAttribute('class', 'star-icon-header filled');
    halfStar.setAttribute('viewBox', '0 0 24 24');
    halfStar.innerHTML = `
        <defs><clipPath id="halfClip"><rect x="0" y="0" width="12" height="24"/></clipPath></defs>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#e0e0e0"/>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fbbc05" clip-path="url(#halfClip)"/>`;
    container.appendChild(halfStar);
}

function getTimeAgo(dateString) {
    const diff = Math.floor((new Date() - new Date(dateString)) / 86400000);
    if (diff === 0) return 'today';
    if (diff === 1) return 'yesterday';
    if (diff < 7)  return `${diff} days ago`;
    if (diff < 14) return '1 week ago';
    if (diff < 21) return '2 weeks ago';
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
    return `${Math.floor(diff / 365)} years ago`;
}

const reviewsData = [
    {
        name: 'JESSY T channel',
        text: 'They solve my problem nicely, good service and quick',
        actualDate: '2026-04-05', rating: 5,
        avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVOSlIKpDcrgBi0TaxNVRpDXv0SKcHJeCwDvKXjjDuA5VSORgQL=s36-c-rp-mo-br100',
        googleReviewUrl: 'https://maps.app.goo.gl/Sp9huEGGNBiJRs8V7'
    },
    {
        name: 'Poulo Trading',
        text: 'As a property owner, I need reliable contractors. BS Appliance Expect Repairs has been my go-to for appliances for 3 years now. The technicians are always on time and do quality work.',
        actualDate: '2026-04-12', rating: 5,
        avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVtGjKqXHHrpx-WF5V7VOasPVgBoFjrTBCgazW056LQT-Xsqj8=s36-c-rp-mo-br100',
        googleReviewUrl: 'https://maps.app.goo.gl/YAN74ruSXE9xUgLe8'
    },
    {
        name: 'Peter Magalefa',
        text: 'Very good with their service',
        actualDate: '2026-04-27', rating: 5,
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJxsmiAxodS-h4JMe052Kh9fyZXBqrl6KfswUirpmo-V-Zohg=w36-h36-p-rp-mo-br100',
        googleReviewUrl: 'https://maps.app.goo.gl/BLfBaHoQuz7JfikR7'
    },
    {
        name: 'Elton Dube',
        text: 'Good repair service',
        actualDate: '2026-04-27', rating: 5,
        avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVC0PiHQYQujr-MYQ7y1HW6R8Rg0nw_doPf8julyvp1vPgtnAqi=w36-h36-p-rp-mo-br100',
        googleReviewUrl: 'https://maps.app.goo.gl/UpEvCiCoGrtN6Qe27'
    }
];

let showAll = false;
const reviewsFeed = document.getElementById('reviewsFeed');
const viewMoreBtn = document.getElementById('viewMoreBtn');
const reviewBtn   = document.getElementById('reviewBtn');

function updateGoogleReviewLink() {
    if (reviewBtn) reviewBtn.href = 'https://g.page/r/CXrZojCwtyw8ECE/review';
}

function renderReviews() {
    if (!reviewsFeed) return;
    const list = showAll ? reviewsData : reviewsData.slice(0, 3);
    reviewsFeed.innerHTML = '';
    list.forEach((review, i) => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.style.animationDelay = `${i * 0.05}s`;
        card.innerHTML = `
            ${getStarsRow(review.rating)}
            <p class="review-text">"${review.text}"</p>
            <div class="reviewer-section">
                <img src="${review.avatar}" alt="Photo of ${review.name}" class="reviewer-avatar" width="44" height="44" loading="lazy">
                <div class="reviewer-info">
                    <div class="name-row">
                        <a href="${review.googleReviewUrl}" target="_blank" rel="noopener noreferrer" class="reviewer-name">${review.name}</a>
                        <div class="verified-tick">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.6"><polyline points="20 6 9 17 4 12"/></svg>
                            <span class="tooltip">Verified Customer</span>
                        </div>
                    </div>
                    <div class="review-date">${getTimeAgo(review.actualDate)}</div>
                </div>
            </div>
            <div class="google-attribution">
                <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Posted on Google Maps</span>
            </div>`;
        reviewsFeed.appendChild(card);
    });
    if (viewMoreBtn) viewMoreBtn.textContent = showAll ? 'Show less reviews' : 'View more reviews';
}

getHeaderStars();
updateGoogleReviewLink();
renderReviews();
if (viewMoreBtn) viewMoreBtn.addEventListener('click', () => { showAll = !showAll; renderReviews(); });

// ========================================
// Navbar scroll shadow
// ========================================
window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.style.boxShadow = window.pageYOffset > 50
        ? '0 4px 30px rgba(0,0,0,0.1)'
        : '0 2px 20px rgba(0,0,0,0.05)';
});

// ========================================
// Mobile menu
// ========================================
function closeMobileMenu() {
    if (!navLinks || !mobileMenuBtn) return;
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => link.addEventListener('click', closeMobileMenu));
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target))
            closeMobileMenu();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMobileMenu(); });
}

// ========================================
// Smooth scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
        }
    });
});

// ========================================
// Scroll animations
// ========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .process-card, .stat-item, .value-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ========================================
// Floating contact hub (WhatsApp / Email / Call)
// ========================================
(function () {
    const hubWrapper   = document.getElementById('floatingHub');
    const mainFab      = document.getElementById('mainFab');
    const reminderPopup = document.getElementById('reminderPopup');
    const closeReminder = document.getElementById('closeReminderBtn');
    let menuOpen = false, reminderVisible = false;

    function openMenu()  { if (!hubWrapper) return; hubWrapper.classList.add('active');    menuOpen = true;  hideReminder(); }
    function closeMenu() { if (!hubWrapper) return; hubWrapper.classList.remove('active'); menuOpen = false; }
    function showReminder() {
        if (!reminderPopup || menuOpen || reminderVisible) return;
        if (sessionStorage.getItem('waPopupShown')) return; // only ever once per visit
        reminderPopup.classList.add('show');
        reminderVisible = true;
        sessionStorage.setItem('waPopupShown', 'true');
        // no auto-hide — stays until the visitor closes it, so it doesn't
        // vanish while they're mid-scroll and haven't noticed it yet
    }
    function hideReminder() {
        if (!reminderPopup) return;
        reminderPopup.classList.remove('show'); reminderVisible = false;
    }

    // FAB click
    if (mainFab) {
        mainFab.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            menuOpen ? closeMenu() : openMenu();
        });
    }

    // Reminder click (ignore the Start Chat link so it can navigate normally)
    if (reminderPopup) {
        reminderPopup.addEventListener('click', (e) => {
            if (e.target.closest('.wa-chat-start')) return;
            if (e.target.id === 'closeReminderBtn') { hideReminder(); return; }
            menuOpen ? closeMenu() : openMenu();
            hideReminder();
        });
    }
    if (closeReminder) closeReminder.addEventListener('click', (e) => { e.stopPropagation(); hideReminder(); });

    // Close on outside click / ESC
    document.addEventListener('click', (e) => { if (hubWrapper && !hubWrapper.contains(e.target) && menuOpen) closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) closeMenu(); });

    // Close options after selection
    document.querySelectorAll('.contact-action-btn').forEach(btn =>
        btn.addEventListener('click', () => setTimeout(closeMenu, 200))
    );

    // Show once, shortly after arrival — no repeat interval anymore
   // setTimeout(showReminder, 3000);
})();

// ===== Services Dropdown (tap-to-open on mobile) =====
document.querySelectorAll('.nav-dropdown > a.dropdown-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        }
    });
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
    });
});