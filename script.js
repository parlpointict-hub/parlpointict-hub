const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: prepare the message for the visitor's chosen sending channel.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const reply = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const method = document.getElementById('deliveryMethod').value;
    const publicSiteUrl = 'https://parlpointict-hub.github.io/parlpointict-hub/';
    const body = `Hello Parlpoint ICT,\n\nName: ${name}\nContact: ${reply || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}\n\nWebsite: ${publicSiteUrl}`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me/254754910014?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
    } else if (method === 'email') {
      window.location.href = `mailto:parlpointict@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.location.href = `sms:+254114343661?body=${encodeURIComponent(body)}`;
    }
  });
}

// Horizontal service carousels: click arrows to browse one product at a time.
document.querySelectorAll('.carousel-shell').forEach((shell) => {
  const track = shell.querySelector('.product-track');
  const prev = shell.querySelector('.carousel-arrow.prev');
  const next = shell.querySelector('.carousel-arrow.next');
  const step = () => {
    const card = track.querySelector('.product-card');
    return card ? card.getBoundingClientRect().width + 16 : 280;
  };
  prev?.addEventListener('click', () => track.scrollBy({left: -step(), behavior: 'smooth'}));
  next?.addEventListener('click', () => track.scrollBy({left: step(), behavior: 'smooth'}));
});

// Discuss-project and product-order actions prepare the contact form.
// Visitors can choose WhatsApp or SMS before sending.
const publicSiteUrl = 'https://parlpointict-hub.github.io/parlpointict-hub/';
const contactNameInput = document.getElementById('contactName');
const contactSubjectInput = document.getElementById('contactSubject');
const contactMessageInput = document.getElementById('contactMessage');
const deliveryMethodSelect = document.getElementById('deliveryMethod');
const contactSection = document.getElementById('contact');

function prepareContact(subject, message) {
  if (contactSubjectInput) contactSubjectInput.value = subject;
  if (contactMessageInput) contactMessageInput.value = message + `\n\nWebsite: ${publicSiteUrl}`;
  if (deliveryMethodSelect) deliveryMethodSelect.value = 'whatsapp';
  contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => contactNameInput?.focus({ preventScroll: true }), 450);
}

document.querySelectorAll('[data-order]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const product = link.getAttribute('data-order');
    prepareContact(
      `Order / Quotation: ${product}`,
      `Hello Parlpoint ICT, I would like to place an order or request a quotation for: ${product}. Please contact me with the next steps.`
    );
  });
});

document.querySelector('[data-discuss-project]')?.addEventListener('click', () => {
  prepareContact(
    'Project Discussion',
    'Hello Parlpoint ICT, I would like to discuss a project. Please get in touch with me.'
  );
});
