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


// Parlpoint ICT marketing message generator. Drafts are generated in-browser;
// sending is handed off to the visitor's SMS, WhatsApp or email application.
const marketingForm = document.getElementById('marketingForm');
let generatedMessages = null;
if (marketingForm) {
  const value = id => document.getElementById(id)?.value.trim() || '';
  const greeting = (name, role) => {
    if (name && role) return `Dear ${name} (${role}),`;
    if (name) return `Dear ${name},`;
    return role ? `Dear ${role},` : 'Dear Sir/Madam,';
  };
  const buildMessages = () => {
    const name = value('prospectName');
    const role = value('prospectRole');
    const org = value('prospectOrg');
    const service = value('marketingService');
    const benefit = value('marketingBenefit');
    const hello = greeting(name, role);
    const organisation = org ? ` at ${org}` : '';
    const benefitLine = benefit ? `

${benefit}` : '';
    const signature = `

Parlpoint ICT Ltd
Call/SMS: 0114343661
WhatsApp: 0754910014
Email: parlpointict@gmail.com
Website: https://parlpointict-hub.github.io/parlpointict-hub/`;
    const sms = `${hello} Parlpoint ICT provides ${service.toLowerCase()} to help organisations work more efficiently.${benefit ? ` ${benefit}` : ''} May we arrange a brief demonstration? Call/SMS 0114343661 or WhatsApp 0754910014.`;
    const whatsapp = `${hello}

Greetings from Parlpoint ICT Ltd. We support organisations${organisation} with practical technology solutions, including ${service.toLowerCase()}. Our aim is to help your team simplify daily work, improve organisation and make better use of technology.${benefitLine}

We would appreciate an opportunity to understand your needs and arrange a brief demonstration or discussion at a convenient time.

Kind regards,
Parlpoint ICT Ltd
Call/SMS: 0114343661
WhatsApp: 0754910014
Email: parlpointict@gmail.com
Website: https://parlpointict-hub.github.io/parlpointict-hub/

If these updates are not relevant to you, please let us know and we will not contact you again.`;
    const subject = `Introducing ${service} | Parlpoint ICT Ltd`;
    const email = `${hello}

I am reaching out on behalf of Parlpoint ICT Ltd to introduce our ${service.toLowerCase()}. We work with schools, healthcare facilities, businesses and other organisations to provide practical ICT and digital solutions.

We would welcome an opportunity to learn about your organisation’s needs and show you how this solution may be useful.${benefitLine}

Please let us know a convenient time for a brief discussion or demonstration. There is no obligation.

Kind regards,
Parlpoint ICT Ltd
Call/SMS: 0114343661
WhatsApp: 0754910014
Email: parlpointict@gmail.com
Website: https://parlpointict-hub.github.io/parlpointict-hub/

If you prefer not to receive further marketing emails from us, reply and let us know.`;
    return {sms, whatsapp, subject, email};
  };
  marketingForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!value('prospectOrg')) { document.getElementById('prospectOrg').focus(); return; }
    generatedMessages = buildMessages();
    document.getElementById('smsDraft').value = generatedMessages.sms;
    document.getElementById('whatsappDraft').value = generatedMessages.whatsapp;
    document.getElementById('emailSubjectDraft').value = generatedMessages.subject;
    document.getElementById('emailDraft').value = generatedMessages.email;
    document.querySelectorAll('.message-card').forEach(card => card.hidden = false);
    document.getElementById('smsCount').textContent = `${generatedMessages.sms.length} characters`;
    document.getElementById('marketingStatus').textContent = 'Drafts generated. Review and edit them before sending.';
  });
  document.getElementById('smsDraft')?.addEventListener('input', e => {
    document.getElementById('smsCount').textContent = `${e.target.value.length} characters`;
  });
  const normaliseKenyanNumber = raw => {
    let n = (raw || '').replace(/[^0-9+]/g, '');
    if (n.startsWith('+')) n = n.slice(1);
    if (n.startsWith('0')) n = '254' + n.slice(1);
    if (n.startsWith('7') || n.startsWith('1')) n = '254' + n;
    return /^254[17]\d{8}$/.test(n) ? n : null;
  };
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const text = document.getElementById(button.dataset.copy).value;
    try { await navigator.clipboard.writeText(text); document.getElementById('marketingStatus').textContent = 'Message copied to clipboard.'; }
    catch { document.getElementById(button.dataset.copy).select(); document.execCommand('copy'); document.getElementById('marketingStatus').textContent = 'Message copied. You can now paste it into your app.'; }
  }));
  document.querySelectorAll('[data-send]').forEach(button => button.addEventListener('click', () => {
    const channel = button.dataset.send;
    const phone = normaliseKenyanNumber(value('prospectPhone'));
    const email = value('prospectEmail');
    if ((channel === 'sms' || channel === 'whatsapp') && !phone) {
      document.getElementById('marketingStatus').textContent = 'Enter a valid Kenyan recipient phone number (for example 0712345678) before opening this channel.';
      document.getElementById('prospectPhone').focus(); return;
    }
    if (channel === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('marketingStatus').textContent = 'Enter a valid recipient email address before opening email.';
      document.getElementById('prospectEmail').focus(); return;
    }
    if (channel === 'whatsapp') window.open(`https://wa.me/${phone}?text=${encodeURIComponent(document.getElementById('whatsappDraft').value)}`, '_blank', 'noopener');
    if (channel === 'sms') window.location.href = `sms:+${phone}?body=${encodeURIComponent(document.getElementById('smsDraft').value)}`;
    if (channel === 'email') window.location.href = `mailto:${email}?subject=${encodeURIComponent(document.getElementById('emailSubjectDraft').value)}&body=${encodeURIComponent(document.getElementById('emailDraft').value)}`;
    document.getElementById('marketingStatus').textContent = 'Your selected app is opening. Review the recipient and message, then press Send in that app.';
  }));
}

// Bulk campaign helper: prepares a personalised draft for each selected school/customer.
(() => {
  const listInput = document.getElementById('bulkRecipients');
  if (!listInput) return;
  const preview = document.getElementById('bulkRecipientPreview');
  const loadButton = document.getElementById('loadBulkList');
  const startButton = document.getElementById('startBulkSend');
  const csvInput = document.getElementById('bulkCsv');
  let recipients = [];
  let queue = [];
  let queueIndex = 0;
  const clean = s => (s || '').trim();
  const phoneDigits = raw => {
    let n = clean(raw).replace(/[^0-9+]/g, '');
    if (n.startsWith('+')) n = n.slice(1);
    if (n.startsWith('0')) n = '254' + n.slice(1);
    if (n.startsWith('7') || n.startsWith('1')) n = '254' + n;
    return /^254[17]\d{8}$/.test(n) ? n : '';
  };
  const parseRows = text => text.split(/\r?\n/).map(line => {
    const cols = line.split(',').map(clean);
    if (!cols[0] || /^(school|organisation|organization|name)$/i.test(cols[0])) return null;
    return {name: cols[0], phone: cols[1] || '', email: cols[2] || ''};
  }).filter(Boolean);
  const renderPreview = () => {
    const valid = recipients.filter(r => r.name);
    preview.innerHTML = valid.length ? `<strong>${valid.length} recipient(s) loaded</strong><ol>${valid.map(r => `<li>${escapeHtml(r.name)} — ${escapeHtml(r.phone || 'No phone')} — ${escapeHtml(r.email || 'No email')}</li>`).join('')}</ol>` : 'No valid recipients found. Add school name, phone number and optional email.';
    startButton.disabled = !valid.length;
  };
  const escapeHtml = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  loadButton?.addEventListener('click', () => { recipients = parseRows(listInput.value); renderPreview(); });
  csvInput?.addEventListener('change', async () => {
    const file = csvInput.files?.[0]; if (!file) return;
    listInput.value = await file.text(); recipients = parseRows(listInput.value); renderPreview();
  });
  const campaignDraft = (recipient, channel) => {
    const service = document.getElementById('marketingService')?.value || 'ICT solutions';
    const benefit = clean(document.getElementById('marketingBenefit')?.value);
    const hello = `Dear ${recipient.name},`;
    const benefitText = benefit ? `\n\n${benefit}` : '';
    if (channel === 'sms') return `${hello} Parlpoint ICT offers ${service.toLowerCase()} to help your organisation work more efficiently.${benefit ? ' ' + benefit : ''} May we arrange a brief demonstration? Call/SMS 0114343661 or WhatsApp 0754910014.`;
    if (channel === 'whatsapp') return `${hello}\n\nGreetings from Parlpoint ICT Ltd. We provide ${service.toLowerCase()} to help ${recipient.name} simplify daily operations, improve organisation and make better use of technology.${benefitText}\n\nMay we arrange a brief demonstration or discussion at your convenience?\n\nKind regards,\nParlpoint ICT Ltd\nCall/SMS: 0114343661\nWhatsApp: 0754910014\nEmail: parlpointict@gmail.com\nWebsite: https://parlpointict-hub.github.io/parlpointict-hub/\n\nIf you do not wish to receive further business updates, please let us know.`;
    return `${hello}\n\nI am contacting you on behalf of Parlpoint ICT Ltd to introduce our ${service.toLowerCase()}. We help schools, businesses and other organisations improve their daily operations through practical digital solutions.${benefitText}\n\nWe would appreciate an opportunity to arrange a brief demonstration at a time convenient to you. Please let us know if you would be interested.\n\nKind regards,\nParlpoint ICT Ltd\nCall/SMS: 0114343661\nWhatsApp: 0754910014\nEmail: parlpointict@gmail.com\nWebsite: https://parlpointict-hub.github.io/parlpointict-hub/\n\nIf you prefer not to receive further marketing emails from us, reply and let us know.`;
  };
  const openNext = () => {
    if (queueIndex >= queue.length) { preview.insertAdjacentHTML('beforeend', '<p><strong>Campaign queue completed.</strong> All selected drafts have been opened for review.</p>'); return; }
    const item = queue[queueIndex]; const channel = document.getElementById('bulkChannel').value;
    const phone = phoneDigits(item.phone);
    const msg = campaignDraft(item, channel);
    if ((channel === 'sms' || channel === 'whatsapp') && !phone) { alert(`Add a valid Kenyan phone number for ${item.name} before continuing.`); return; }
    if (channel === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)) { alert(`Add a valid email address for ${item.name} before continuing.`); return; }
    if (channel === 'whatsapp') window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    if (channel === 'sms') window.location.href = `sms:+${phone}?body=${encodeURIComponent(msg)}`;
    if (channel === 'email') window.location.href = `mailto:${encodeURIComponent(item.email)}?subject=${encodeURIComponent('Introducing ' + (document.getElementById('marketingService')?.value || 'ICT solutions') + ' | Parlpoint ICT Ltd')}&body=${encodeURIComponent(msg)}`;
    queueIndex++;
    const next = document.getElementById('bulkNextRecipient');
    if (next) next.textContent = queueIndex < queue.length ? `Open next recipient (${queueIndex + 1} of ${queue.length})` : 'Campaign queue completed';
    preview.insertAdjacentHTML('beforeend', `<p>Prepared ${escapeHtml(item.name)} (${queueIndex} of ${queue.length}). Review and press Send in the opened app.</p>`);
  };
  startButton?.addEventListener('click', () => {
    const channel = document.getElementById('bulkChannel').value;
    queue = recipients.filter(r => channel === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email) : !!phoneDigits(r.phone));
    queueIndex = 0;
    if (!queue.length) { preview.insertAdjacentHTML('beforeend', '<p>No recipients have valid contact details for this channel.</p>'); return; }
    let next = document.getElementById('bulkNextRecipient');
    if (!next) { next = document.createElement('button'); next.type = 'button'; next.id = 'bulkNextRecipient'; next.className = 'btn btn-primary'; startButton.insertAdjacentElement('afterend', next); }
    next.textContent = `Open first recipient (1 of ${queue.length})`;
    next.onclick = openNext;
    preview.insertAdjacentHTML('beforeend', `<p><strong>${queue.length} recipients ready.</strong> Use the button to open each personalised ${channel.toUpperCase()} draft one by one. You must review and press Send yourself.</p>`);
  });
})();
