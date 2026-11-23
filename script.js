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



// Contact management: local browser database, CSV import/export and reviewed campaign hand-off.
(() => {
  const manager = document.getElementById('contactManager');
  if (!manager) return;
  const CATEGORIES = ['Schools', 'Hospitals & Medical Centres', 'Ultrasound & X-ray Imaging Centres'];
  const STORAGE_KEY = 'parlpoint_contacts_v1';
  const $ = id => document.getElementById(id);
  const status = message => { $('contactManagerStatus').textContent = message; };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const makeId = () => 'c_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  let contacts = [];
  let activeCategory = CATEGORIES[0];
  let selected = new Set();
  let campaignQueue = [];
  let campaignIndex = 0;
  const persist = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts)); } catch { status('Could not save in this browser. Export the contacts to keep a backup.'); } };
  const parseCSV = text => {
    const rows=[]; let row=[], cell='', quoted=false;
    for(let i=0;i<text.length;i++) { const ch=text[i]; if(quoted) { if(ch==='"' && text[i+1]==='"'){cell+='"';i++;} else if(ch==='"') quoted=false; else cell+=ch; } else if(ch==='"') quoted=true; else if(ch===','){row.push(cell);cell='';} else if(ch==='\n'){row.push(cell);rows.push(row);row=[];cell='';} else if(ch!=='\r') cell+=ch; }
    row.push(cell); if(row.some(v=>v.trim())) rows.push(row); return rows;
  };
  const csvCell = v => '"' + String(v ?? '').replace(/"/g,'""') + '"';
  const saveBlob = (content, filename, type) => { const blob=new Blob([content],{type}); const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url); };
  const currentVisible = () => { const q=$('contactSearch').value.trim().toLowerCase(), f=$('contactStatusFilter').value; return contacts.filter(c=>c.category===activeCategory && (f==='all'||c.status===f) && (!q||c.name.toLowerCase().includes(q)||c.phone.toLowerCase().includes(q))); };
  const render = () => {
    const rows=currentVisible();
    $('contactTableBody').innerHTML = rows.map(c=>`<tr><td><input type="checkbox" class="contact-select" data-id="${escapeHtml(c.id)}" ${selected.has(c.id)?'checked':''} aria-label="Select ${escapeHtml(c.name)}"></td><td><strong>${escapeHtml(c.name)}</strong></td><td>${escapeHtml(c.phone||'—')}</td><td>${escapeHtml(c.email||'—')}</td><td><span class="contact-pill ${c.status==='Active'?'is-active':'is-inactive'}">${escapeHtml(c.status)}</span></td><td class="contact-row-actions"><button type="button" data-action="edit" data-id="${escapeHtml(c.id)}">Edit</button><button type="button" data-action="toggle" data-id="${escapeHtml(c.id)}">${c.status==='Active'?'Deactivate':'Activate'}</button><button type="button" data-action="delete" data-id="${escapeHtml(c.id)}">Delete</button></td></tr>`).join('') || '<tr><td colspan="6" class="contact-empty">No contacts match this category and filter.</td></tr>';
    $('contactListTitle').textContent=activeCategory;
    $('contactFilteredCount').textContent=`${rows.length} shown`;
    $('contactTotal').textContent=`${contacts.length} total contacts`;
    $('selectedContactCount').textContent=selected.size;
    $('selectVisibleContacts').checked=rows.length>0 && rows.every(c=>selected.has(c.id));
    $('selectAllActive').checked=contacts.filter(c=>c.category===activeCategory&&c.status==='Active').length>0 && contacts.filter(c=>c.category===activeCategory&&c.status==='Active').every(c=>selected.has(c.id));
    $('startContactCampaign').disabled=selected.size===0;
  };
  const resetEditor = () => { $('contactEditor').reset(); $('editContactId').value=''; $('editContactStatus').value='Active'; $('saveContact').textContent='Add contact'; $('cancelContactEdit').hidden=true; };
  const beginEdit = c => { $('editContactId').value=c.id; $('editContactName').value=c.name; $('editContactPhone').value=c.phone; $('editContactEmail').value=c.email; $('editContactStatus').value=c.status; $('saveContact').textContent='Update contact'; $('cancelContactEdit').hidden=false; $('editContactName').focus(); };
  const normalisePhone = raw => { let n=(raw||'').replace(/[^0-9+]/g,''); if(n.startsWith('+'))n=n.slice(1); if(n.startsWith('0'))n='254'+n.slice(1); if(n.startsWith('7')||n.startsWith('1'))n='254'+n; return /^254[17]\d{8}$/.test(n)?n:''; };
  const setCategory = category => { activeCategory=category; selected=new Set([...selected].filter(id=>contacts.some(c=>c.id===id))); document.querySelectorAll('.contact-tab').forEach(b=>{const on=b.dataset.category===category;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on));}); render(); };
  $('contactEditor').addEventListener('submit', e=>{e.preventDefault(); const id=$('editContactId').value; const item={id:id||makeId(),category:activeCategory,name:$('editContactName').value.trim(),phone:$('editContactPhone').value.trim(),email:$('editContactEmail').value.trim(),status:$('editContactStatus').value}; if(!item.name){status('Organisation name is required.');return;} if(id){const i=contacts.findIndex(c=>c.id===id);if(i>=0)contacts[i]=item;status('Contact updated.');}else{contacts.push(item);status('Contact added.');} persist();resetEditor();render();});
  $('cancelContactEdit').addEventListener('click',resetEditor);
  document.querySelectorAll('.contact-tab').forEach(b=>b.addEventListener('click',()=>setCategory(b.dataset.category)));
  $('contactSearch').addEventListener('input',render); $('contactStatusFilter').addEventListener('change',render);
  $('contactTableBody').addEventListener('change',e=>{if(e.target.matches('.contact-select')){const id=e.target.dataset.id;e.target.checked?selected.add(id):selected.delete(id);render();}});
  $('contactTableBody').addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(!b)return;const c=contacts.find(x=>x.id===b.dataset.id);if(!c)return;if(b.dataset.action==='edit')beginEdit(c);if(b.dataset.action==='toggle'){c.status=c.status==='Active'?'Inactive':'Active';persist();render();status(`${c.name} is now ${c.status.toLowerCase()}.`);}if(b.dataset.action==='delete'&&confirm(`Delete ${c.name} from the contact database?`)){contacts=contacts.filter(x=>x.id!==c.id);selected.delete(c.id);persist();render();status('Contact deleted.');}});
  $('selectVisibleContacts').addEventListener('change',e=>{currentVisible().forEach(c=>e.target.checked?selected.add(c.id):selected.delete(c.id));render();});
  $('selectAllActive').addEventListener('change',e=>{contacts.filter(c=>c.category===activeCategory&&c.status==='Active').forEach(c=>e.target.checked?selected.add(c.id):selected.delete(c.id));render();});
  $('deleteSelectedContacts').addEventListener('click',()=>{if(!selected.size){status('Select at least one contact first.');return;}if(!confirm(`Permanently delete ${selected.size} selected contact(s)?`))return;contacts=contacts.filter(c=>!selected.has(c.id));selected.clear();persist();render();status('Selected contacts deleted.');});
  $('exportContacts').addEventListener('click',()=>{const rows=contacts.filter(c=>c.category===activeCategory);const head=['category','organisation_name','phone','email','status'];const csv=[head,...rows.map(c=>[c.category,c.name,c.phone,c.email,c.status])].map(r=>r.map(csvCell).join(',')).join('\r\n');saveBlob('\ufeff'+csv,activeCategory.toLowerCase().replace(/[^a-z0-9]+/g,'_')+'_contacts.csv','text/csv;charset=utf-8');status(`Exported ${rows.length} ${activeCategory.toLowerCase()} contacts.`);});
  $('importContactsFile').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{const rows=parseCSV(await file.text());if(!rows.length)throw new Error('The file is empty.');const headers=rows.shift().map(h=>h.trim().toLowerCase().replace(/^\ufeff/,''));const idx=(...names)=>headers.findIndex(h=>names.includes(h));const ni=idx('organisation_name','organisation name','organization_name','name'),ci=idx('category'),pi=idx('phone','phone_number'),ei=idx('email'),si=idx('status');if(ni<0)throw new Error('CSV must include an organisation_name or name column.');let added=0,updated=0;rows.forEach(r=>{const name=(r[ni]||'').trim();if(!name)return;const cat=ci>=0&&CATEGORIES.includes((r[ci]||'').trim())?(r[ci]||'').trim():activeCategory;const phone=pi>=0?(r[pi]||'').trim():'';const email=ei>=0?(r[ei]||'').trim():'';const st=si>=0&&/^inactive$/i.test(r[si]||'')?'Inactive':'Active';const old=contacts.find(c=>c.category===cat&&c.name.toLowerCase()===name.toLowerCase());if(old){old.phone=phone||old.phone;old.email=email||old.email;old.status=st;updated++;}else{contacts.push({id:makeId(),category:cat,name,phone,email,status:st});added++;}});persist();render();status(`CSV import complete: ${added} added, ${updated} updated.`);}catch(err){status(`Import failed: ${err.message}`);}e.target.value='';});
  $('useSelectedContacts').addEventListener('click',()=>{const chosen=contacts.filter(c=>selected.has(c.id));if(!chosen.length){status('Select contacts first.');return;}const first=chosen[0];$('prospectOrg').value=first.name;$('prospectPhone').value=first.phone||'';$('prospectEmail').value=first.email||'';$('contactCampaign').scrollIntoView({behavior:'smooth',block:'center'});status(`${chosen.length} contact(s) selected. Campaign drafts can now be generated in one step.`);});
  const campaignMessage = (c,channel) => {const service=$('marketingService').value;const benefit=$('marketingBenefit').value.trim();const extra=benefit?'\n\n'+benefit:'';if(channel==='sms')return `Dear ${c.name}, Parlpoint ICT offers ${service.toLowerCase()} to help your organisation work more efficiently.${benefit?' '+benefit:''} May we arrange a brief demonstration? Call/SMS 0114343661. Reply STOP if you do not wish to receive further updates.`;if(channel==='whatsapp')return `Dear ${c.name},\n\nGreetings from Parlpoint ICT Ltd. We provide ${service.toLowerCase()} to help organisations improve daily operations.${extra}\n\nMay we arrange a brief discussion or demonstration?\n\nKind regards,\nParlpoint ICT Ltd\nCall/SMS: 0114343661\nWhatsApp: 0754910014\nEmail: parlpointict@gmail.com\nWebsite: https://parlpointict-hub.github.io/parlpointict-hub/\n\nIf you do not wish to receive further business updates, please let us know.`;return `Dear ${c.name},\n\nI am contacting you on behalf of Parlpoint ICT Ltd to introduce our ${service.toLowerCase()}. We provide practical ICT and digital solutions for organisations.${extra}\n\nWould you be available for a brief discussion or demonstration?\n\nKind regards,\nParlpoint ICT Ltd\nCall/SMS: 0114343661\nWhatsApp: 0754910014\nEmail: parlpointict@gmail.com\nWebsite: https://parlpointict-hub.github.io/parlpointict-hub/\n\nIf you prefer not to receive further marketing emails, reply and let us know.`;};
  const renderCampaignDrafts = () => {const box=$('campaignDraftList');box.innerHTML=campaignQueue.map((item,i)=>`<article class="campaign-draft" data-campaign-index="${i}"><div class="campaign-draft-top"><strong>${i+1}. ${escapeHtml(item.contact.name)}</strong><label><input type="checkbox" class="campaign-approve" data-index="${i}" ${item.approved?'checked':''}> I approve this message</label></div><div class="campaign-draft-meta">${escapeHtml(item.contact.phone||item.contact.email||'No destination')}</div><textarea class="campaign-draft-text" data-index="${i}" rows="5" aria-label="Draft message for ${escapeHtml(item.contact.name)}">${escapeHtml(item.message)}</textarea><div class="campaign-draft-actions"><button type="button" class="btn btn-outline-dark campaign-copy" data-index="${i}">Copy draft</button><button type="button" class="btn btn-primary campaign-open" data-index="${i}" ${item.approved?'':'disabled'}>Open in ${item.channel==='whatsapp'?'WhatsApp':item.channel==='sms'?'SMS':'email'}</button></div></article>`).join('');};
  $('startContactCampaign').addEventListener('click',()=>{const channel=$('contactCampaignChannel').value;const eligible=contacts.filter(c=>selected.has(c.id)&&c.status==='Active'&&(channel==='email'?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email):!!normalisePhone(c.phone)));campaignQueue=eligible.map(contact=>({contact,channel,message:campaignMessage(contact,channel),approved:false}));campaignIndex=0;if(!campaignQueue.length){$('contactCampaignStatus').textContent='No selected active contacts have valid details for this channel.';$('nextContactCampaign').hidden=true;$('campaignDraftList').innerHTML='';return;}renderCampaignDrafts();$('nextContactCampaign').hidden=false;$('nextContactCampaign').textContent='Open next approved draft';$('contactCampaignStatus').textContent=`Prepared ${campaignQueue.length} personalised draft(s). Review each message, edit if needed, and tick approval before opening it. No message has been sent.`;});
  $('campaignDraftList').addEventListener('input',e=>{if(e.target.matches('.campaign-draft-text')){const i=Number(e.target.dataset.index);if(campaignQueue[i])campaignQueue[i].message=e.target.value;}});
  $('campaignDraftList').addEventListener('change',e=>{if(e.target.matches('.campaign-approve')){const i=Number(e.target.dataset.index);if(campaignQueue[i])campaignQueue[i].approved=e.target.checked;const card=e.target.closest('.campaign-draft');card.querySelector('.campaign-open').disabled=!e.target.checked;}});
  $('campaignDraftList').addEventListener('click',e=>{const copy=e.target.closest('.campaign-copy'),open=e.target.closest('.campaign-open');if(copy){const item=campaignQueue[Number(copy.dataset.index)];if(item)navigator.clipboard?.writeText(item.message).then(()=>{$('contactCampaignStatus').textContent='Draft copied to clipboard.';}).catch(()=>{$('contactCampaignStatus').textContent='Copy was blocked by the browser; select and copy the draft text.';});}if(open){const i=Number(open.dataset.index);openCampaignDraft(i);}});
  const openCampaignDraft = i => {const item=campaignQueue[i];if(!item||!item.approved)return;const c=item.contact,phone=normalisePhone(c.phone),msg=item.message;if(item.channel==='whatsapp')window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank','noopener');else if(item.channel==='sms')window.location.href=`sms:+${phone}?body=${encodeURIComponent(msg)}`;else window.location.href=`mailto:${encodeURIComponent(c.email)}?subject=${encodeURIComponent('Introducing '+$('marketingService').value+' | Parlpoint ICT Ltd')}&body=${encodeURIComponent(msg)}`;campaignIndex=Math.max(campaignIndex,i+1);$('contactCampaignStatus').textContent=`Opened approved draft for ${c.name}. Check the message and press Send in the app yourself. This website has not sent it.`;};
  $('nextContactCampaign').addEventListener('click',()=>{const next=campaignQueue.findIndex((item,i)=>i>=campaignIndex&&item.approved);if(next<0){$('contactCampaignStatus').textContent='No more approved drafts are waiting. Approve another draft or finish the campaign.';$('nextContactCampaign').hidden=true;return;}openCampaignDraft(next);});
  fetch('contacts_seed.json').then(r=>{if(!r.ok)throw new Error('seed unavailable');return r.json();}).then(seed=>{let saved=null;try{saved=localStorage.getItem(STORAGE_KEY);}catch{}contacts=saved?JSON.parse(saved):seed;contacts=contacts.map(c=>({...c,id:c.id||makeId(),status:c.status==='Inactive'?'Inactive':'Active'}));if(!saved)persist();render();}).catch(()=>{try{contacts=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');}catch{contacts=[];}render();status('Could not load the starter CSV data. Import your CSV files to populate the contact list.');});
})();
