/**
 * Wanderly — Curated Travel Website Interactivity
 * Pure Vanilla JavaScript (ES6+)
 */

'use strict';

const DESTINATIONS = {
  Manali: {
    region: 'Himachal Pradesh',
    subtitle: 'Pine Forests & Himalayan Passes',
    duration: '5 Days / 4 Nights',
    season: 'Mar – Jun, Oct – Feb',
    basePrice: 18500,
    itinerary: [
      'Arrive in Manali, riverside check-in at your cedarwood cottage, and evening walk along Old Manali cafes.',
      'Guided sunrise excursion to Solang Valley, alpine meadow trails, and adventure paragliding or cable-car views.',
      'Cross the Atal Tunnel to Sissu Waterfall in Lahaul Valley with a curated picnic lunch by the Chandra River.',
      'Visit Hadimba Devi Temple in ancient deodar woods, Naggar Castle heritage gallery, and riverside bonfire dinner.',
      'Leisure breakfast overlooking the Beas valley followed by private transfer for your onward journey.'
    ]
  },
  Goa: {
    region: 'West Coast',
    subtitle: 'Quiet Coves & Latin Quarters',
    duration: '4 Days / 3 Nights',
    season: 'Nov – Mar',
    basePrice: 16200,
    itinerary: [
      'Arrival in South Goa, check-in to a palm-fringed boutique eco-villa, and sunset unwind at Agonda Cove.',
      'Morning kayak through tranquil backwaters followed by a heritage walking tour of Panjim’s Fontainhas Latin Quarter.',
      'Organic spice plantation tasting lunch and private sunset catamaran sail along the Arabian Sea.',
      'Slow coastal breakfast by Palolem beach and private airport or station transfer.'
    ]
  },
  Kashmir: {
    region: 'Jammu & Kashmir',
    subtitle: 'Alpine Meadows & Dal Lake',
    duration: '6 Days / 5 Nights',
    season: 'Apr – Oct, Dec – Feb',
    basePrice: 24900,
    itinerary: [
      'Arrive in Srinagar, step aboard a traditional cedarwood houseboat on Dal Lake, and enjoy sunset kahwa tea.',
      'Dawn shikara glide past floating vegetable gardens, followed by Mughal terrace gardens and old-city craft ateliers.',
      'Scenic drive to Gulmarg meadows, Gondola Phase II ascent to snowy Apharwat ridges, and alpine lodge stay.',
      'Journey through saffron fields of Pampore to Pahalgam along the Lidder River valley.',
      'Guided pony or foot trail through Betaab Valley and Aru pine meadows with a riverside farewell dinner.',
      'Morning Kashmiri bakery breakfast and private transfer to Srinagar Airport.'
    ]
  },
  Jaipur: {
    region: 'Rajasthan',
    subtitle: 'Sandstone Palaces & Craft Bazaars',
    duration: '4 Days / 3 Nights',
    season: 'Oct – Mar',
    basePrice: 17400,
    itinerary: [
      'Check-in at a restored heritage haveli, high tea on the veranda, and golden-hour views from Nahargarh Fort.',
      'Early-morning tour of Amber Fort & Sheesh Mahal, Panna Meena Stepwell, and block-printing workshop in Sanganer.',
      'Walk past Hawa Mahal’s latticed facade, explore City Palace courtyards, Jantar Mantar, and Johari craft bazaars.',
      'Courtyard breakfast with traditional music before private departure transfer.'
    ]
  }
};

const TIER_CONFIG = {
  classic: { label: 'Classic Comfort', multiplier: 1 },
  boutique: { label: 'Boutique Luxury', multiplier: 1.35 },
  adventure: { label: 'Private Curated Expedition', multiplier: 1.55 }
};

document.addEventListener('DOMContentLoaded', () => {
  // Core DOM references
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const exploreBtn = document.getElementById('explore-btn');
  const backToTopBtn = document.getElementById('back-to-top');
  const currentYearEl = document.getElementById('current-year');

  // Filter & Destination cards
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const destinationCards = Array.from(document.querySelectorAll('.destination-card'));
  const bookDestButtons = Array.from(document.querySelectorAll('.book-dest-btn'));
  const viewItineraryButtons = Array.from(document.querySelectorAll('.view-itinerary-btn'));
  const footerDestButtons = Array.from(document.querySelectorAll('.footer-dest-link'));

  // Modal elements
  const modal = document.getElementById('itinerary-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalBookBtn = document.getElementById('modal-book-btn');
  const modalRegion = document.getElementById('modal-region');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDuration = document.getElementById('modal-duration');
  const modalSeason = document.getElementById('modal-season');
  const modalPrice = document.getElementById('modal-price');
  const modalItineraryList = document.getElementById('modal-itinerary-list');

  // Booking form & summary elements
  const bookingForm = document.getElementById('booking-form');
  const bookingConfirmation = document.getElementById('booking-confirmation');
  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const destinationSelect = document.getElementById('destination');
  const travelDateInput = document.getElementById('travel-date');
  const travelersInput = document.getElementById('travelers');
  const packageTierSelect = document.getElementById('package-tier');
  const notesInput = document.getElementById('notes');
  const notesCounter = document.getElementById('notes-counter');
  const termsConsentInput = document.getElementById('terms-consent');
  const newBookingBtn = document.getElementById('new-booking-btn');
  const printBookingBtn = document.getElementById('print-booking-btn');

  // Summary display elements
  const summaryDestName = document.getElementById('summary-dest-name');
  const summaryDestMeta = document.getElementById('summary-dest-meta');
  const summaryDuration = document.getElementById('summary-duration');
  const summaryBaseRate = document.getElementById('summary-base-rate');
  const summaryTier = document.getElementById('summary-tier');
  const summaryGuests = document.getElementById('summary-guests');
  const summaryTaxes = document.getElementById('summary-taxes');
  const summaryTotal = document.getElementById('summary-total');

  // Contact & Newsletter elements
  const contactForm = document.getElementById('contact-form');
  const contactConfirmation = document.getElementById('contact-confirmation');
  const contactConfirmationText = document.getElementById('contact-confirmation-text');
  const resetContactBtn = document.getElementById('reset-contact-btn');
  const contactNameInput = document.getElementById('contact-name');
  const contactEmailInput = document.getElementById('contact-email');
  const contactTopicSelect = document.getElementById('contact-topic');
  const contactMessageInput = document.getElementById('contact-message');
  const copyButtons = Array.from(document.querySelectorAll('.copy-btn'));
  const socialLinks = Array.from(document.querySelectorAll('.social-link'));
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmailInput = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');
  const toastEl = document.getElementById('toast');

  let activeModalDestination = null;
  let lastFocusedBeforeModal = null;
  let toastTimeout = null;
  let bookingSubmitAttempted = false;
  let contactSubmitAttempted = false;

  // Set current year in footer
  if (currentYearEl) {
    currentYearEl.textContent = String(new Date().getFullYear());
  }

  // Format currency in INR
  function formatINR(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  }

  // Get today's local date string (YYYY-MM-DD)
  function getTodayDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Escape HTML before injecting dynamic strings into DOM
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Show temporary toast feedback
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.hidden = true;
    }, 3000);
  }

  // Smooth scroll helper
  function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ------------------------------------------------------------------------
  // 1. Navbar, Mobile Menu & Scroll Tracking
  // ------------------------------------------------------------------------
  function setMobileMenu(isOpen) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navMenu.classList.toggle('is-open', isOpen);
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const currentlyOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setMobileMenu(!currentlyOpen);
    });
  }

  // Close mobile menu when clicking a navigation link or CTA inside it
  if (navMenu) {
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMobileMenu(false));
    });
  }

  // Close mobile menu on outside click or viewport resize
  document.addEventListener('click', (event) => {
    if (!navMenu || !navToggle) return;
    const isMenuOpen = navMenu.classList.contains('is-open');
    if (isMenuOpen && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      setMobileMenu(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) {
      setMobileMenu(false);
    }
  });

  // Sticky header elevation & active section highlighting
  const trackedSections = ['home', 'destinations', 'ai-assistant', 'about', 'booking', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateHeaderAndActiveNav() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 18);
    }

    const scrollPosition = window.scrollY + 140;
    let currentId = 'home';

    for (const section of trackedSections) {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', updateHeaderAndActiveNav, { passive: true });
  updateHeaderAndActiveNav();

  // Explore button smooth scroll
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      smoothScrollTo('#destinations');
    });
  }

  // Back to top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Destination Category Filter
  // ------------------------------------------------------------------------
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      destinationCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });

  // ------------------------------------------------------------------------
  // 3. Itinerary Modal
  // ------------------------------------------------------------------------
  function openItineraryModal(destName) {
    const dest = DESTINATIONS[destName];
    if (!dest || !modal) return;

    activeModalDestination = destName;
    lastFocusedBeforeModal = document.activeElement;

    modalRegion.textContent = dest.region;
    modalTitle.textContent = `${destName} Itinerary`;
    modalSubtitle.textContent = dest.subtitle;
    modalDuration.textContent = dest.duration;
    modalSeason.textContent = dest.season;
    modalPrice.textContent = `${formatINR(dest.basePrice)} / guest`;

    modalItineraryList.innerHTML = '';
    dest.itinerary.forEach((dayText) => {
      const li = document.createElement('li');
      li.textContent = dayText;
      modalItineraryList.appendChild(li);
    });

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeItineraryModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
    }
  }

  viewItineraryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      openItineraryModal(btn.dataset.destination);
    });
  });

  footerDestButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      openItineraryModal(btn.dataset.destination);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeItineraryModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeItineraryModal);

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeItineraryModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeItineraryModal();
      setMobileMenu(false);
    }
  });

  // ------------------------------------------------------------------------
  // 4. Booking Selection & Live Price Estimator
  // ------------------------------------------------------------------------
  function selectDestinationForBooking(destName) {
    if (!DESTINATIONS[destName] || !destinationSelect) return;

    // Ensure form is visible if confirmation was previously shown
    if (bookingConfirmation && !bookingConfirmation.hidden) {
      resetBookingFormState();
    }

    destinationSelect.value = destName;
    updateBookingSummary();
    validateBookingField('destination');
    smoothScrollTo('#booking');

    setTimeout(() => {
      if (fullNameInput) fullNameInput.focus({ preventScroll: true });
    }, 450);
  }

  bookDestButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectDestinationForBooking(btn.dataset.destination);
    });
  });

  if (modalBookBtn) {
    modalBookBtn.addEventListener('click', () => {
      const chosen = activeModalDestination;
      closeItineraryModal();
      if (chosen) {
        selectDestinationForBooking(chosen);
      }
    });
  }

  function calculatePricing() {
    const destKey = destinationSelect ? destinationSelect.value : '';
    const dest = DESTINATIONS[destKey];
    const tierKey = packageTierSelect ? packageTierSelect.value : 'classic';
    const tier = TIER_CONFIG[tierKey] || TIER_CONFIG.classic;
    const rawGuests = travelersInput ? Number(travelersInput.value.trim()) : 2;
    const guests = Number.isInteger(rawGuests) && rawGuests >= 1 && rawGuests <= 10 ? rawGuests : 0;

    if (!dest) {
      return {
        dest: null,
        tier,
        guests,
        subtotal: 0,
        taxes: 0,
        total: 0
      };
    }

    const perGuest = dest.basePrice * tier.multiplier;
    const subtotal = perGuest * guests;
    const taxes = subtotal * 0.05;
    const total = subtotal + taxes;

    return {
      dest,
      tier,
      guests,
      perGuest,
      subtotal,
      taxes,
      total
    };
  }

  function updateBookingSummary() {
    const pricing = calculatePricing();
    const destKey = destinationSelect ? destinationSelect.value : '';

    if (!pricing.dest) {
      summaryDestName.textContent = 'Select a Destination';
      summaryDestMeta.textContent = 'Choose from Manali, Goa, Kashmir, or Jaipur to preview your itinerary pricing.';
      summaryDuration.textContent = '—';
      summaryBaseRate.textContent = '—';
      summaryTier.textContent = pricing.tier.label;
      summaryGuests.textContent = pricing.guests ? `${pricing.guests} ${pricing.guests === 1 ? 'Guest' : 'Guests'}` : '—';
      summaryTaxes.textContent = '—';
      summaryTotal.textContent = '₹0';
      return;
    }

    summaryDestName.textContent = destKey;
    summaryDestMeta.textContent = `${pricing.dest.region} • ${pricing.dest.subtitle}`;
    summaryDuration.textContent = pricing.dest.duration;
    summaryBaseRate.textContent = formatINR(pricing.perGuest);
    summaryTier.textContent = pricing.tier.label;
    summaryGuests.textContent = pricing.guests ? `${pricing.guests} ${pricing.guests === 1 ? 'Guest' : 'Guests'}` : 'Invalid count';
    summaryTaxes.textContent = pricing.guests ? formatINR(pricing.taxes) : '—';
    summaryTotal.textContent = pricing.guests ? formatINR(pricing.total) : '₹0';
  }

  // Set minimum travel date to today
  if (travelDateInput) {
    travelDateInput.min = getTodayDateString();
  }

  // Character counter for special requests
  if (notesInput && notesCounter) {
    notesInput.addEventListener('input', () => {
      notesCounter.textContent = `${notesInput.value.length} / 300`;
    });
  }

  // ------------------------------------------------------------------------
  // 5. Form Validation Helpers & Booking Submission
  // ------------------------------------------------------------------------
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,59}$/;
  const PHONE_CHARS_REGEX = /^[+\d\s()-]+$/;

  function setFieldError(inputEl, errorElId, message) {
    const errorEl = document.getElementById(errorElId);
    if (errorEl) {
      errorEl.textContent = message;
    }
    if (inputEl) {
      inputEl.classList.toggle('is-invalid', Boolean(message));
      inputEl.setAttribute('aria-invalid', message ? 'true' : 'false');
    }
    return !message;
  }

  function validateBookingField(fieldName) {
    switch (fieldName) {
      case 'fullName': {
        const val = fullNameInput.value.trim();
        if (!val) return setFieldError(fullNameInput, 'error-full-name', 'Please enter your full name.');
        if (!NAME_REGEX.test(val)) {
          return setFieldError(fullNameInput, 'error-full-name', 'Enter a valid name using letters (at least 2 characters).');
        }
        return setFieldError(fullNameInput, 'error-full-name', '');
      }

      case 'email': {
        const val = emailInput.value.trim();
        if (!val) return setFieldError(emailInput, 'error-email', 'Please enter your email address.');
        if (!EMAIL_REGEX.test(val)) {
          return setFieldError(emailInput, 'error-email', 'Please enter a valid email address (e.g. name@domain.com).');
        }
        return setFieldError(emailInput, 'error-email', '');
      }

      case 'phone': {
        const val = phoneInput.value.trim();
        const digitsOnly = val.replace(/\D/g, '');
        if (!val) return setFieldError(phoneInput, 'error-phone', 'Please provide a contact phone number.');
        if (!PHONE_CHARS_REGEX.test(val) || digitsOnly.length < 10 || digitsOnly.length > 15) {
          return setFieldError(phoneInput, 'error-phone', 'Enter a valid phone number with 10 to 15 digits.');
        }
        return setFieldError(phoneInput, 'error-phone', '');
      }

      case 'destination': {
        const val = destinationSelect.value;
        if (!val || !DESTINATIONS[val]) {
          return setFieldError(destinationSelect, 'error-destination', 'Please choose a destination.');
        }
        return setFieldError(destinationSelect, 'error-destination', '');
      }

      case 'travelDate': {
        const val = travelDateInput.value;
        const today = getTodayDateString();
        if (!val) return setFieldError(travelDateInput, 'error-travel-date', 'Please select your departure date.');
        if (val < today) {
          return setFieldError(travelDateInput, 'error-travel-date', 'Departure date cannot be in the past.');
        }
        return setFieldError(travelDateInput, 'error-travel-date', '');
      }

      case 'travelers': {
        const raw = travelersInput.value.trim();
        const num = Number(raw);
        if (!raw || !Number.isInteger(num) || num < 1 || num > 10) {
          return setFieldError(travelersInput, 'error-travelers', 'Choose between 1 and 10 travelers.');
        }
        return setFieldError(travelersInput, 'error-travelers', '');
      }

      case 'termsConsent': {
        if (!termsConsentInput.checked) {
          return setFieldError(termsConsentInput, 'error-terms-consent', 'Please confirm the booking terms to continue.');
        }
        return setFieldError(termsConsentInput, 'error-terms-consent', '');
      }

      default:
        return true;
    }
  }

  const bookingFieldBindings = [
    { name: 'fullName', el: fullNameInput, event: 'input' },
    { name: 'email', el: emailInput, event: 'input' },
    { name: 'phone', el: phoneInput, event: 'input' },
    { name: 'destination', el: destinationSelect, event: 'change' },
    { name: 'travelDate', el: travelDateInput, event: 'change' },
    { name: 'travelers', el: travelersInput, event: 'input' },
    { name: 'termsConsent', el: termsConsentInput, event: 'change' }
  ];

  bookingFieldBindings.forEach(({ name, el, event }) => {
    if (!el) return;
    el.addEventListener(event, () => {
      if (name === 'destination' || name === 'travelers') {
        updateBookingSummary();
      }
      if (bookingSubmitAttempted || el.classList.contains('is-invalid')) {
        validateBookingField(name);
      }
    });
    el.addEventListener('blur', () => {
      if (el.value || bookingSubmitAttempted) {
        validateBookingField(name);
      }
    });
  });

  if (packageTierSelect) {
    packageTierSelect.addEventListener('change', updateBookingSummary);
  }

  function formatReadableDate(isoDate) {
    const [year, month, day] = isoDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function generateBookingReference() {
    const year = new Date().getFullYear();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    return `WND-${year}-${randomCode}`;
  }

  function resetBookingFormState() {
    if (!bookingForm || !bookingConfirmation) return;
    bookingForm.reset();
    bookingSubmitAttempted = false;
    travelersInput.value = '2';
    if (notesCounter) notesCounter.textContent = '0 / 300';

    bookingFieldBindings.forEach(({ name, el }) => {
      const errorIdMap = {
        fullName: 'error-full-name',
        email: 'error-email',
        phone: 'error-phone',
        destination: 'error-destination',
        travelDate: 'error-travel-date',
        travelers: 'error-travelers',
        termsConsent: 'error-terms-consent'
      };
      setFieldError(el, errorIdMap[name], '');
    });

    bookingConfirmation.hidden = true;
    bookingForm.hidden = false;
    updateBookingSummary();
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      bookingSubmitAttempted = true;

      const results = bookingFieldBindings.map(({ name, el }) => ({
        el,
        valid: validateBookingField(name)
      }));

      const firstInvalid = results.find((item) => !item.valid);
      if (firstInvalid) {
        firstInvalid.el.focus();
        showToast('Please fix the highlighted booking fields.');
        return;
      }

      const pricing = calculatePricing();
      const destName = destinationSelect.value;
      const refId = generateBookingReference();
      const guestCount = Number(travelersInput.value);
      const formattedDate = formatReadableDate(travelDateInput.value);
      const travelerName = fullNameInput.value.trim();
      const travelerEmail = emailInput.value.trim();
      const notesVal = notesInput.value.trim();

      document.getElementById('conf-destination').textContent = `${destName} Escape`;
      document.getElementById('conf-message').textContent =
        `Thank you, ${travelerName}! Your booking request (${refId}) has been received and a confirmation copy is ready for ${travelerEmail}.`;

      const confDetailsEl = document.getElementById('conf-details');
      confDetailsEl.innerHTML = `
        <div class="conf-item"><span>Reference ID</span><strong>${escapeHTML(refId)}</strong></div>
        <div class="conf-item"><span>Lead Traveler</span><strong>${escapeHTML(travelerName)}</strong></div>
        <div class="conf-item"><span>Destination</span><strong>${escapeHTML(destName)} (${escapeHTML(pricing.dest.duration)})</strong></div>
        <div class="conf-item"><span>Departure Date</span><strong>${escapeHTML(formattedDate)}</strong></div>
        <div class="conf-item"><span>Travelers</span><strong>${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'}</strong></div>
        <div class="conf-item"><span>Experience Tier</span><strong>${escapeHTML(pricing.tier.label)}</strong></div>
        <div class="conf-item"><span>Estimated Total</span><strong>${escapeHTML(formatINR(pricing.total))}</strong></div>
        <div class="conf-item"><span>Special Notes</span><strong>${notesVal ? escapeHTML(notesVal) : 'None specified'}</strong></div>
      `;

      bookingForm.hidden = true;
      bookingConfirmation.hidden = false;
      bookingConfirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast(`Booking ${refId} confirmed!`);
    });
  }

  if (newBookingBtn) {
    newBookingBtn.addEventListener('click', () => {
      resetBookingFormState();
      if (fullNameInput) fullNameInput.focus();
    });
  }

  if (printBookingBtn) {
    printBookingBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Initialize summary on load
  updateBookingSummary();

  // ------------------------------------------------------------------------
  // 6. Contact Form Validation & Utility Buttons
  // ------------------------------------------------------------------------
  function validateContactField(fieldName) {
    if (fieldName === 'contactName') {
      const val = contactNameInput.value.trim();
      if (!val || val.length < 2) {
        return setFieldError(contactNameInput, 'error-contact-name', 'Please enter your name (at least 2 characters).');
      }
      return setFieldError(contactNameInput, 'error-contact-name', '');
    }
    if (fieldName === 'contactEmail') {
      const val = contactEmailInput.value.trim();
      if (!val || !EMAIL_REGEX.test(val)) {
        return setFieldError(contactEmailInput, 'error-contact-email', 'Please enter a valid email address.');
      }
      return setFieldError(contactEmailInput, 'error-contact-email', '');
    }
    if (fieldName === 'contactMessage') {
      const val = contactMessageInput.value.trim();
      if (!val || val.length < 10) {
        return setFieldError(contactMessageInput, 'error-contact-message', 'Please write a short message (at least 10 characters).');
      }
      return setFieldError(contactMessageInput, 'error-contact-message', '');
    }
    return true;
  }

  [
    { name: 'contactName', el: contactNameInput },
    { name: 'contactEmail', el: contactEmailInput },
    { name: 'contactMessage', el: contactMessageInput }
  ].forEach(({ name, el }) => {
    if (!el) return;
    el.addEventListener('input', () => {
      if (contactSubmitAttempted || el.classList.contains('is-invalid')) {
        validateContactField(name);
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactSubmitAttempted = true;

      const checks = [
        { el: contactNameInput, valid: validateContactField('contactName') },
        { el: contactEmailInput, valid: validateContactField('contactEmail') },
        { el: contactMessageInput, valid: validateContactField('contactMessage') }
      ];

      const invalid = checks.find((c) => !c.valid);
      if (invalid) {
        invalid.el.focus();
        return;
      }

      const sender = contactNameInput.value.trim();
      const topic = contactTopicSelect ? contactTopicSelect.value : 'Travel Inquiry';
      contactConfirmationText.textContent = `Thanks, ${sender}. Your message regarding "${topic}" has been routed to our concierge desk. Expect a reply within 2 hours.`;
      contactForm.hidden = true;
      contactConfirmation.hidden = false;
      showToast('Message sent to Wanderly concierge.');
    });
  }

  if (resetContactBtn) {
    resetContactBtn.addEventListener('click', () => {
      contactForm.reset();
      contactSubmitAttempted = false;
      setFieldError(contactNameInput, 'error-contact-name', '');
      setFieldError(contactEmailInput, 'error-contact-email', '');
      setFieldError(contactMessageInput, 'error-contact-message', '');
      contactConfirmation.hidden = true;
      contactForm.hidden = false;
      contactNameInput.focus();
    });
  }

  // Copy email button
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      if (!value) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(value);
        }
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        showToast(`Copied ${value} to clipboard`);
        setTimeout(() => {
          btn.textContent = original;
        }, 1800);
      } catch {
        showToast(`Email: ${value}`);
      }
    });
  });

  // Social links toast feedback
  socialLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const label = link.dataset.toast || 'Wanderly Social';
      showToast(`Connect with us: ${label}`);
    });
  });

  // ------------------------------------------------------------------------
  // 7. Footer Newsletter Subscription
  // ------------------------------------------------------------------------
  if (newsletterForm && newsletterEmailInput && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailVal = newsletterEmailInput.value.trim();
      if (!emailVal || !EMAIL_REGEX.test(emailVal)) {
        newsletterFeedback.textContent = 'Please enter a valid email address.';
        newsletterFeedback.classList.add('is-error');
        newsletterEmailInput.focus();
        return;
      }
      newsletterFeedback.textContent = `Subscribed ${emailVal} to Seasonal Field Notes.`;
      newsletterFeedback.classList.remove('is-error');
      newsletterForm.reset();
      showToast('Subscribed to Wanderly Field Notes!');
    });
  }

  // ------------------------------------------------------------------------
  // 8. Wanderly AI Travel Assistant (Connected to POST /api/ai/chat)
  // ------------------------------------------------------------------------
  const aiStatusPill = document.getElementById('ai-status-pill');
  const aiStatusText = document.getElementById('ai-status-text');
  const aiModelLabel = document.getElementById('ai-model-label');
  const aiErrorBanner = document.getElementById('ai-error-banner');
  const aiErrorTitle = document.getElementById('ai-error-title');
  const aiErrorMessage = document.getElementById('ai-error-message');
  const aiChatMessages = document.getElementById('ai-chat-messages');
  const aiTypingIndicator = document.getElementById('ai-typing-indicator');
  const aiChatForm = document.getElementById('ai-chat-form');
  const aiChatInput = document.getElementById('ai-chat-input');
  const aiSendBtn = document.getElementById('ai-send-btn');
  const aiClearBtn = document.getElementById('ai-clear-btn');
  const aiPromptChips = Array.from(document.querySelectorAll('.ai-prompt-chip'));

  const AI_SESSION_KEY = 'wanderly_ai_session_history';
  const AI_WELCOME_TEXT =
    'Namaste! I am Wanderly AI, your travel concierge. Ask me to plan a trip, compare Manali and Kashmir, or suggest routes within your budget.';

  let aiSessionHistory = [];
  let aiRequestPending = false;

  function loadSessionChatHistory() {
    try {
      if (typeof sessionStorage === 'undefined') return [];
      const raw = sessionStorage.getItem(AI_SESSION_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) =>
          item &&
          (item.role === 'user' || item.role === 'model') &&
          typeof item.text === 'string' &&
          item.text.trim().length > 0
      );
    } catch {
      return [];
    }
  }

  function saveSessionChatHistory() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(AI_SESSION_KEY, JSON.stringify(aiSessionHistory));
      }
    } catch {
      // Ignore storage quota or restricted context errors
    }
  }

  function setAiErrorBanner(title, message) {
    if (!aiErrorBanner || !aiErrorTitle || !aiErrorMessage) return;
    if (!message) {
      aiErrorBanner.hidden = true;
      aiErrorMessage.textContent = '';
      return;
    }
    aiErrorTitle.textContent = title || 'AI Concierge Notice';
    aiErrorMessage.textContent = message;
    aiErrorBanner.hidden = false;
  }

  function appendFormattedInlineText(container, text) {
    const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
    parts.forEach((part) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        const strong = document.createElement('strong');
        strong.textContent = part.slice(2, -2);
        container.appendChild(strong);
      } else if (part) {
        container.appendChild(document.createTextNode(part));
      }
    });
  }

  function appendFormattedBubbleContent(bubbleEl, rawText) {
    const lines = String(rawText || '').split(/\r?\n/);
    let currentList = null;

    const flushList = () => {
      if (currentList) {
        bubbleEl.appendChild(currentList);
        currentList = null;
      }
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        flushList();
        return;
      }

      const headingMatch = line.match(/^#{1,4}\s+(.+)$/);
      if (headingMatch) {
        flushList();
        const heading = document.createElement('h4');
        appendFormattedInlineText(heading, headingMatch[1]);
        bubbleEl.appendChild(heading);
        return;
      }

      const bulletMatch = line.match(/^(?:[-*]|\d+\.)\s+(.+)$/);
      if (bulletMatch) {
        if (!currentList) {
          currentList = document.createElement('ul');
        }
        const li = document.createElement('li');
        appendFormattedInlineText(li, bulletMatch[1]);
        currentList.appendChild(li);
        return;
      }

      flushList();
      const p = document.createElement('p');
      appendFormattedInlineText(p, line);
      bubbleEl.appendChild(p);
    });

    flushList();
  }

  function appendChatMessage(role, text, options = {}) {
    if (!aiChatMessages) return;
    const { isError = false, label = null } = options;

    const row = document.createElement('div');
    row.className = `ai-message-row ${role === 'user' ? 'is-user' : 'is-model'}`;

    const meta = document.createElement('span');
    meta.className = 'ai-message-meta';
    meta.textContent = label || (role === 'user' ? 'You' : isError ? 'Wanderly AI Error' : 'Wanderly AI');

    const bubble = document.createElement('div');
    bubble.className = `ai-bubble ${
      role === 'user' ? 'ai-bubble-user' : isError ? 'ai-bubble-error' : 'ai-bubble-model'
    }`;

    if (role === 'user' || isError) {
      bubble.textContent = text;
    } else {
      appendFormattedBubbleContent(bubble, text);
    }

    row.appendChild(meta);
    row.appendChild(bubble);
    aiChatMessages.appendChild(row);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }

  function renderSessionConversation() {
    if (!aiChatMessages) return;
    aiChatMessages.innerHTML = '';
    appendChatMessage('model', AI_WELCOME_TEXT);
    aiSessionHistory.forEach((entry) => {
      appendChatMessage(entry.role, entry.text);
    });
  }

  function setAiLoadingState(isLoading) {
    aiRequestPending = isLoading;
    if (aiTypingIndicator) {
      aiTypingIndicator.hidden = !isLoading;
    }
    if (aiSendBtn) {
      aiSendBtn.disabled = isLoading;
    }
    aiPromptChips.forEach((chip) => {
      chip.disabled = isLoading;
    });
    if (isLoading && aiChatMessages) {
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }
  }

  async function checkAiHealthStatus() {
    if (!aiStatusPill || !aiStatusText) return;

    if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
      aiStatusPill.classList.add('is-error');
      aiStatusText.textContent = 'Run via Node.js server (node server.js)';
      setAiErrorBanner(
        'Backend Server Required',
        'Open this site through the Node.js server (http://localhost:3000) so Wanderly AI can securely reach Gemini.'
      );
      return;
    }

    if (typeof fetch !== 'function') return;

    try {
      const response = await fetch('/api/health');
      const data = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error('Health check returned an unexpected response.');
      }

      if (aiModelLabel && data.ai?.model) {
        aiModelLabel.textContent = `Powered by Gemini (${data.ai.model})`;
      }

      if (data.ai?.configured) {
        aiStatusPill.classList.remove('is-error');
        aiStatusPill.classList.add('is-online');
        aiStatusText.textContent = 'Online • Gemini AI Ready';
        setAiErrorBanner('', '');
      } else {
        aiStatusPill.classList.remove('is-online');
        aiStatusPill.classList.add('is-error');
        aiStatusText.textContent = 'Setup Required • Missing API Key';
        setAiErrorBanner(
          'Gemini API Key Missing',
          'Add your Gemini API key to the server .env file and restart the Node.js server to activate live AI responses.'
        );
      }
    } catch {
      aiStatusPill.classList.remove('is-online');
      aiStatusPill.classList.add('is-error');
      aiStatusText.textContent = 'Offline • Backend Unavailable';
      setAiErrorBanner(
        'Backend Connection Unavailable',
        'Start the Node.js server (node server.js) to connect to the Wanderly AI assistant.'
      );
    }
  }

  async function sendAiChatMessage(rawPrompt) {
    if (aiRequestPending) return;
    const message = String(rawPrompt || '').trim();
    if (!message) {
      showToast('Please enter a travel question first.');
      if (aiChatInput) aiChatInput.focus();
      return;
    }

    const historySnapshot = aiSessionHistory.slice();
    appendChatMessage('user', message);

    if (aiChatInput) {
      aiChatInput.value = '';
      aiChatInput.style.height = 'auto';
    }

    setAiErrorBanner('', '');
    setAiLoadingState(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          history: historySnapshot
        })
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || !data?.ok) {
        const errorCode = data?.error?.code || 'AI_REQUEST_ERROR';
        const errorMsg =
          data?.error?.message || `Unable to reach Wanderly AI (HTTP ${response.status}).`;

        if (response.status === 503 || errorCode === 'AI_NOT_CONFIGURED') {
          setAiErrorBanner('Gemini API Key Missing', errorMsg);
          if (aiStatusPill && aiStatusText) {
            aiStatusPill.classList.remove('is-online');
            aiStatusPill.classList.add('is-error');
            aiStatusText.textContent = 'Setup Required • Missing API Key';
          }
        } else {
          setAiErrorBanner('AI Response Error', errorMsg);
        }

        appendChatMessage('model', errorMsg, { isError: true });
        return;
      }

      const replyText = String(data.reply || '').trim();
      if (!replyText) {
        const emptyMsg = 'Wanderly AI returned an empty response. Please try again.';
        setAiErrorBanner('Empty AI Response', emptyMsg);
        appendChatMessage('model', emptyMsg, { isError: true });
        return;
      }

      aiSessionHistory.push({ role: 'user', text: message });
      aiSessionHistory.push({ role: 'model', text: replyText });
      saveSessionChatHistory();

      appendChatMessage('model', replyText);
    } catch {
      const networkMsg =
        'Could not reach the Wanderly AI server. Ensure `node server.js` is running and try again.';
      setAiErrorBanner('Connection Error', networkMsg);
      appendChatMessage('model', networkMsg, { isError: true });
    } finally {
      setAiLoadingState(false);
    }
  }

  if (aiChatMessages) {
    aiSessionHistory = loadSessionChatHistory();
    renderSessionConversation();
    checkAiHealthStatus();
  }

  if (aiChatForm && aiChatInput) {
    aiChatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      sendAiChatMessage(aiChatInput.value);
    });

    aiChatInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendAiChatMessage(aiChatInput.value);
      }
    });

    aiChatInput.addEventListener('input', () => {
      aiChatInput.style.height = 'auto';
      aiChatInput.style.height = `${Math.min(aiChatInput.scrollHeight, 120)}px`;
    });
  }

  aiPromptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const promptText = chip.dataset.prompt || chip.textContent.trim();
      sendAiChatMessage(promptText);
    });
  });

  if (aiClearBtn) {
    aiClearBtn.addEventListener('click', () => {
      if (aiRequestPending) return;
      aiSessionHistory = [];
      saveSessionChatHistory();
      setAiErrorBanner('', '');
      renderSessionConversation();
      showToast('Chat history cleared.');
      if (aiChatInput) aiChatInput.focus();
    });
  }
});
