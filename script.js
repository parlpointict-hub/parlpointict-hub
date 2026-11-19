// Mobile navigation menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');

    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      open ? 'Close navigation' : 'Open navigation'
    );
  });

  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Automatic copyright year
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const reply = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const method = document.getElementById('deliveryMethod').value;

    // Contact message including Parlpoint ICT website
    const body = `Hello Parlpoint ICT,

Name: ${name}
Contact: ${reply || 'Not provided'}
Subject: ${subject}

Message:
${message}

Website: https://www.parlpointict.com`;

    // WhatsApp
    if (method === 'whatsapp') {
      window.open(
        `https://wa.me/254754910014?text=${encodeURIComponent(body)}`,
        '_blank',
        'noopener'
      );

    // Email
    } else if (method === 'email') {
      window.location.href =
        `mailto:parlpointict@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // SMS
    } else {
      window.location.href =
        `sms:+254754910014?body=${encodeURIComponent(body)}`;
    }
  });
}