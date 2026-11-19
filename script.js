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
    const body = `Hello Parlpoint ICT,\n\nName: ${name}\nContact: ${reply || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me/254754910014?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
    } else if (method === 'email') {
      window.location.href = `mailto:parlpointict@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.location.href = `sms:+254754910014?body=${encodeURIComponent(body)}`;
    }
  });
}
