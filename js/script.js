/**
 * Chukwudi Solomon — Personal Brand Website Interactions (2026)
 * Vanilla JavaScript (No Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileNav();
  initSmoothScroll();
  initScrollSpy();
  initScrollReveal();
  initNewsletterForm();
  initBackToTop();
  initDynamicYear();
  initResourceFilters();
  initBookingForm();
  initSnippetFeatures();
});

/* --------------------------------------------------------------------------
   1. STICKY NAVBAR CONTROLLER
   -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION AUTO-CLOSE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
  const navbarCollapse = document.getElementById('primaryNav');
  
  if (!navbarCollapse) return;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        // Use Bootstrap's collapse method if available, or fallback to class removal
        if (window.bootstrap && window.bootstrap.Collapse) {
          const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse) || new window.bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. SMOOTH SCROLLING WITH NAVBAR OFFSET
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([data-bs-toggle])');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. ACTIVE NAV SCROLL SPY
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   5. INTERSECTION OBSERVER SCROLL REVEAL
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   6. NEWSLETTER VALIDATION & SUBMISSION
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const feedbackMsg = document.getElementById('newsletterFeedback');
  const submitBtn = document.getElementById('newsletterSubmitBtn');

  if (!form || !emailInput || !feedbackMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    // Standard RFC 5322 regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      showFeedback('Please enter your email address.', 'error');
      emailInput.focus();
      return;
    }

    if (!emailRegex.test(email)) {
      showFeedback('Please provide a valid email format (e.g. name@domain.com).', 'error');
      emailInput.focus();
      return;
    }

    // Simulate submission state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Subscribing...';
    }

    setTimeout(() => {
      showFeedback('Thank you for subscribing! You will receive weekly insights directly in your inbox.', 'success');
      emailInput.value = '';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Subscribed!';
        setTimeout(() => {
          submitBtn.innerHTML = 'Subscribe →';
        }, 3000);
      }
    }, 600);
  });

  function showFeedback(text, type) {
    feedbackMsg.textContent = text;
    feedbackMsg.className = `form-feedback-msg show-${type}`;
  }
}

/* --------------------------------------------------------------------------
   7. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   8. DYNAMIC COPYRIGHT YEAR
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   9. RESOURCE FILTERING
   -------------------------------------------------------------------------- */
function initResourceFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const resourceCards = document.querySelectorAll('.resource-item-col');

  if (!filterButtons.length || !resourceCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      resourceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   10. BOOKING MODAL FORM HANDLER
   -------------------------------------------------------------------------- */
function initBookingForm() {
  const bookingForm = document.getElementById('bookingModalForm');
  const confirmationBox = document.getElementById('bookingConfirmation');

  if (!bookingForm) return;

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bookingName')?.value.trim();
    const email = document.getElementById('bookingEmail')?.value.trim();
    const service = document.getElementById('bookingService')?.value;

    if (!name || !email) {
      alert('Please fill in your name and email address.');
      return;
    }

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Scheduling...';
    }

    setTimeout(() => {
      bookingForm.style.display = 'none';
      if (confirmationBox) {
        confirmationBox.classList.remove('d-none');
        document.getElementById('confirmedClientName').textContent = name;
        document.getElementById('confirmedService').textContent = service || 'General Consultation';
      }
    }, 700);
  });
}

/* --------------------------------------------------------------------------
   11. MONDAY BUSINESS SNIPPET FEATURES (Calendar & Meet)
   -------------------------------------------------------------------------- */
function initSnippetFeatures() {
  const calendarBtn = document.getElementById('addCalendarBtn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Generate standard Google Calendar event URL for next Monday 10:00 AM WAT
      const title = encodeURIComponent("Monday Business Snippet with Chukwudi Solomon");
      const details = encodeURIComponent("Weekly live session exploring entrepreneurship, business strategy, personal branding, and sustainable growth with Chukwudi Solomon.");
      const location = encodeURIComponent("Google Meet (Live Online)");
      
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&recur=RRULE:FREQ=WEEKLY;BYDAY=MO`;
      window.open(gcalUrl, '_blank');
    });
  }
}
