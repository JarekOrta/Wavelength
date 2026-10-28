// Wavelength front-end demo. Works on GitHub Pages without a build step.
// IMPORTANT: Paste your deployed Google Apps Script WEB APP URL below to
// connect signups to your existing Google Sheet. Do not put API keys here.
const GOOGLE_SHEETS_WEB_APP_URL = "";

const views = document.querySelectorAll('.phone-view');
const ratingDots = document.querySelectorAll('.rating-dot');
const saveButton = document.querySelector('[data-action="save"]');
const ratingHelp = document.getElementById('rating-help');
let selectedRating = 0;

function showView(name) {
  views.forEach((view) => {
    const active = view.dataset.view === name;
    view.hidden = !active;
    view.classList.toggle('is-active', active);
  });
}

function resetRating() {
  selectedRating = 0;
  saveButton.disabled = true;
  ratingHelp.textContent = 'Tap a number to rate this song';
  ratingDots.forEach((dot) => {
    dot.classList.remove('selected');
    dot.setAttribute('aria-pressed', 'false');
  });
}

document.querySelectorAll('[data-action="rate"]').forEach((button) => {
  button.addEventListener('click', () => { resetRating(); showView('rating'); });
});
document.querySelector('[data-action="back"]').addEventListener('click', () => showView('discover'));
document.querySelector('[data-action="restart"]').addEventListener('click', () => { resetRating(); showView('discover'); });
saveButton.addEventListener('click', () => { if (selectedRating) showView('saved'); });
ratingDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    selectedRating = Number(dot.dataset.rating);
    ratingDots.forEach((item) => {
      const pressed = Number(item.dataset.rating) === selectedRating;
      item.classList.toggle('selected', pressed);
      item.setAttribute('aria-pressed', String(pressed));
    });
    ratingHelp.textContent = `${selectedRating} out of 5 — ready to save`;
    saveButton.disabled = false;
  });
});

const signupForm = document.getElementById('beta-form');
const formMessage = document.getElementById('form-message');
const submitButton = signupForm.querySelector('button[type="submit"]');
function setMessage(message, kind = '') {
  formMessage.className = 'form-footnote' + (kind ? ` ${kind}` : '');
  formMessage.textContent = message;
}

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('first-name');
  const emailInput = document.getElementById('email');
  nameInput.setAttribute('aria-invalid', String(!nameInput.checkValidity()));
  emailInput.setAttribute('aria-invalid', String(!emailInput.checkValidity()));
  if (!nameInput.checkValidity()) { nameInput.reportValidity(); return; }
  if (!emailInput.checkValidity()) { emailInput.reportValidity(); return; }

  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    setMessage('The waitlist is not connected yet. Please try again soon.', 'error');
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  setMessage('Submitting your request…');
  try {
    // Google Apps Script returns opaque responses with no-cors. A resolved
    // request confirms submission was sent, NOT that Google Sheets saved it.
    const payload = new URLSearchParams({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      source: 'Wavelength landing page',
    });
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: payload,
    });
    setMessage('Request sent! You should hear from us when the beta opens.', 'success');
    signupForm.reset();
    nameInput.removeAttribute('aria-invalid');
    emailInput.removeAttribute('aria-invalid');
  } catch (error) {
    setMessage('Could not send your request. Please try again.', 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Get Early Access';
  }
});
