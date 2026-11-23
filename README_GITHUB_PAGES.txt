# Parlpoint ICT website

A responsive static company portfolio website prepared from the CV, logo, director photograph and three system user manuals supplied by Parlpoint ICT.

## Preview locally
Open `index.html` in a modern browser. For a local web server, run:
`python -m http.server 8000`
Then visit `http://localhost:8000`.

## Recommended free publishing: Cloudflare Pages + GitHub
Because this website promotes a commercial ICT business and invites quotation enquiries, I recommend keeping the source code in GitHub but publishing the live site with **Cloudflare Pages**. GitHub Pages terms say Pages is not intended or allowed as free hosting for an online business or a website primarily directed at facilitating commercial transactions. See GitHub's official terms: https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features

1. Create a GitHub repository, for example `parlpointict-website`, and upload all files and folders in this package to its root (ensure `index.html` is at the root).
2. Create/sign in to a Cloudflare account and open **Workers & Pages**.
3. Choose **Create application → Pages → Connect to Git**.
4. Connect GitHub and select the `parlpointict-website` repository.
5. Set production branch to `main`. This is a plain HTML site, so no framework/build command is needed; set the build output directory to `/` (repository root) if prompted.
6. Deploy. Cloudflare will provide a `*.pages.dev` website address and can automatically redeploy when you update the GitHub repository.

Cloudflare's official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
Cloudflare Pages free-plan limits: https://developers.cloudflare.com/pages/platform/limits/

## Before publishing
- Add the names and logos of clients you are authorised to identify in the Clients section.
- Review the system descriptions and manuals for the versions you intend to offer.
- MEDCORE HMIS and PHARMAFLOW are identified as development builds in their supplied manuals; the site retains those important limitations.
- Confirm that the phone number and business email are correct.
- The CV itself is not uploaded to the public site; only a professional summary is used to avoid exposing personal CV contact details.

## Package contents
- `index.html`, `styles.css`, `script.js`
- `assets/parlpoint-logo.png`
- `assets/director.png`
- `manuals/SMIS_User_Manual.pdf`
- `manuals/MEDCORE_HMIS_User_Manual.pdf`
- `manuals/PHARMAFLOW_User_Manual.pdf`



## Marketing campaign preparation and approval
The Marketing area can generate personalised campaign drafts in bulk for selected active contacts. Choose WhatsApp, SMS or email, generate all eligible drafts, edit each message, and tick the approval checkbox before opening a draft in the relevant application. The website never sends messages itself: the user must review the opened draft and press Send. Invalid or missing channel details are excluded from the prepared queue.

The existing single-recipient message generator remains available. Campaign drafts are prepared in the browser and are not synchronised between devices.

## Contact form and WhatsApp
The contact form prepares the visitor's message and opens the selected WhatsApp, email or SMS app. The visitor must press Send in that app. A static website cannot send messages directly in the background or trigger an automatic WhatsApp reply.

To enable an automatic reply after a customer messages the business, use WhatsApp Business on the phone registered to +254 754 910 014. Go to Business tools → Greeting message, enable it, paste the text in WHATSAPP_AUTO_REPLY.txt, and save. WhatsApp Business manages this automatic reply, not the website.


## Expanded service catalogue update (November 2026)
- Prominent Parlpoint ICT Ltd brand name and mission / vision statement.
- Expanded IT professional profile and technical service capabilities.
- Service catalogues for printing and stationery, branding and advertising, healthcare printing, IT/software/networking, and institutional administrative support.
- Illustrative service photos, category icons, horizontal auto-moving carousels, prices from the supplied price list, and WhatsApp Place Order links.
- PAYE, SHA and NSSF administrative/portal support is described as assistance only; statutory filings remain the responsibility of authorised client representatives.
- Quote and order messages sent from the contact form include the current public URL: https://parlpointict-hub.github.io/parlpointict-hub/

The product photographs are illustrative mock-up images generated for the catalogue. They are not represented as actual completed client commissions or official client logos. Prices marked Quote / Negotiable require confirmation based on quantities, materials, artwork and specifications.


MARKETING MESSAGE GENERATOR
---------------------------
The website now includes a Marketing Message Generator section in the navigation.
Enter the recipient's name, position, organisation, phone number and/or email, then
choose a Parlpoint ICT service and generate SMS, WhatsApp and email drafts. Each draft
can be edited and copied. The Open SMS / Open WhatsApp / Open email buttons hand the
prepared message to the visitor's device or messaging application. The user must review
and press Send in that application.

This is a static GitHub Pages feature. It does not send messages automatically, store
prospect records, or report delivery/read status. Do not put messaging API keys or other
secrets in this public website. Automatic sending requires secure server-side integration
with approved SMS, WhatsApp Business Platform and email providers, plus appropriate
recipient consent and opt-out handling.


CONTACT MANAGEMENT UPDATE
-------------------------
The marketing area now includes a contact manager with separate tabs for
Schools, Hospitals & Medical Centres, and Ultrasound & X-ray Imaging Centres.
It supports search by organisation or phone, add/edit/delete, activate/deactivate,
selection, active-recipient campaign filtering, and CSV import/export.

The initial contact list is loaded from contacts_seed.json on first visit.
Subsequent changes are stored in the visitor's browser localStorage. This is a
static-site implementation: records are not synchronised between devices or
users and clearing browser data can remove locally saved changes. Export CSV
regularly for backup. For secure shared access, authentication, audit history,
and centrally stored contacts, connect a backend database/API.

Campaign preparation opens one recipient at a time in the user's SMS, WhatsApp
or email application. It does not provide automatic bulk delivery. Automated
sending requires approved SMS/WhatsApp/email providers, credentials, consent
controls, and backend integration.
