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


## Contact form and WhatsApp
The contact form prepares the visitor's message and opens the selected WhatsApp, email or SMS app. The visitor must press Send in that app. A static website cannot send messages directly in the background or trigger an automatic WhatsApp reply.

To enable an automatic reply after a customer messages the business, use WhatsApp Business on the phone registered to +254 754 910 014. Go to Business tools → Greeting message, enable it, paste the text in WHATSAPP_AUTO_REPLY.txt, and save. WhatsApp Business manages this automatic reply, not the website.
