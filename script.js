(function () {
  'use strict';

  const form = document.getElementById('waitlistForm');
  const success = document.getElementById('formSuccess');
  const shareBtn = document.getElementById('shareBtn');
  const yearSpan = document.getElementById('year');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateZip(zip) {
    if (!zip) return true; // optional
    return /^[0-9]{5}$/.test(zip);
  }

  function showError(input, show) {
    if (show) {
      input.classList.add('error');
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.classList.remove('error');
      input.setAttribute('aria-invalid', 'false');
    }
  }

  function validateField(input) {
    const name = input.name;
    let valid = true;

    if (input.hasAttribute('required') && !input.value.trim()) {
      valid = false;
    }

    if (name === 'email' && input.value.trim() && !validateEmail(input.value.trim())) {
      valid = false;
    }

    if (name === 'zip' && input.value.trim() && !validateZip(input.value.trim())) {
      valid = false;
    }

    showError(input, !valid);
    return valid;
  }

  // Real-time validation
  ['name', 'email', 'brokerage', 'zip'].forEach(function (id) {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', function () {
      validateField(input);
    });
    input.addEventListener('input', function () {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const brokerageInput = document.getElementById('brokerage');
    const zipInput = document.getElementById('zip');
    const honeypot = document.getElementById('website');

    // Honeypot check
    if (honeypot && honeypot.value) {
      return;
    }

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isBrokerageValid = validateField(brokerageInput);
    const isZipValid = validateField(zipInput);

    if (!isNameValid || !isEmailValid || !isBrokerageValid || !isZipValid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector('.error');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      brokerage: brokerageInput.value.trim(),
      zip: zipInput.value.trim(),
      source: 'landing_page',
      status: 'waitlist',
      submittedAt: new Date().toISOString()
    };

    // TODO: Replace with your backend endpoint.
    // The form currently captures and validates data client-side.
    // To persist submissions and create CRM records, connect a backend
    // such as a Vercel/Netlify serverless function, Formspree, Basin,
    // or a custom API endpoint that POSTs to:
    //   POST https://www.regently.ai/api/companies/{companyId}/crm/people
    //
    // Example fetch to a custom backend:
    // fetch('https://your-api.example.com/waitlist', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })

    // For MVP: log to console and show success state
    console.log('Waitlist submission:', data);

    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      const shareData = {
        title: 'Nabrix Waitlist',
        text: 'I just joined the Nabrix waitlist for AI-powered neighborhood reports. Check it out!',
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else {
        navigator.clipboard.writeText(shareData.url).then(function () {
          shareBtn.textContent = 'Link copied!';
          setTimeout(function () {
            shareBtn.textContent = 'Share with a colleague';
          }, 2000);
        });
      }
    });
  }
})();
