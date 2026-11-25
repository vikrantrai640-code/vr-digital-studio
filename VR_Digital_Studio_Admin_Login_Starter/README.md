# VR Digital Studio — Website

A lightweight, responsive static website built with HTML5, CSS3 and vanilla JavaScript. It is designed to run locally in Safari on macOS and can be published free with GitHub Pages.

## Files

- `index.html` — page structure, content, SEO metadata and demo portfolio visuals
- `style.css` — brand tokens, layouts, responsive breakpoints and motion preferences
- `script.js` — navigation, scroll reveals, pricing preselection, form validation and email-draft handling
- `favicon.svg` — simple editable monogram favicon

## Open locally on macOS

1. Download and unzip the project folder.
2. Open Finder and locate `index.html`.
3. Double-click `index.html`; Safari should open it.
4. For a local development server (recommended), open Terminal, move into this folder and run:

   ```bash
   cd /path/to/vr-digital-studio
   python3 -m http.server 8000
   ```

5. Visit `http://localhost:8000` in Safari. Stop the server with `Control + C`.

The Google Fonts connection requires internet access. If offline, the site falls back to system sans-serif fonts.

## Edit text, sections and prices

- Open `index.html` in a code editor such as Visual Studio Code or TextEdit in plain-text mode.
- Search for the heading, paragraph or package name you want to change.
- Pricing is in the `#pricing` section of `index.html`. Update the displayed price and included feature list together.
- The main palette and typography are CSS variables at the top of `style.css` inside `:root`.
- Portfolio cards are explicitly marked as **CONCEPT PROJECTS**. Keep that disclosure unless these become genuine commissioned client projects. Sample testimonial wording must remain identified as sample content.

## Email-only contact setup

- The contact/admin inbox is set to `vikrantrai640@gmail.com` in `script.js`.
- Phone and WhatsApp contact options have been removed from the website.
- The enquiry form validates the fields and opens a pre-filled email draft in the visitor's default email app. **It does not submit to a server**; the visitor must review and send the email.
- If the inbox changes, update `CONTACT_EMAIL` in `script.js`.

## Publish free with GitHub Pages

1. Create or sign in to a GitHub account.
2. Create a new public repository, for example `vr-digital-studio`.
3. Upload `index.html`, `style.css`, `script.js` and `favicon.svg` to the repository root. Include this `README.md` if you want the setup notes available in the repository.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)` folder, then save.
7. Wait for GitHub Pages to publish. The site URL will appear in the Pages settings, usually in the form `https://YOUR-USERNAME.github.io/vr-digital-studio/`.
8. Open that URL on desktop and mobile, test all navigation links and submit a test enquiry after configuring the real email address.

GitHub Pages provides static hosting. A custom domain is optional and domain registration may cost money.

## Before sharing with a real business

- Confirm the email-only contact details and test the enquiry form.
- Review every package feature and price; make sure they match what you are actually prepared to deliver.
- Confirm scope, content responsibilities, revision rounds and timeline with each customer before accepting a project.
- Replace fictional concept visuals only with work you have permission to show.
- Test at desktop and mobile widths (1440, 1024, 768, 430, 390 and 360 pixels).
- Check the browser console and verify the live GitHub Pages URL after each significant change.

## Notes

- No framework, build step, backend, paid API or external JavaScript library is required.
- The page uses Google Fonts as an optional external font source; local fallback fonts are provided.
- The email enquiry action relies on the visitor having a default email application configured.
