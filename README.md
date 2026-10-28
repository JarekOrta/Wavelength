# Wavelength — Landing page

A responsive, static Wavelength landing page recreating the Framer reference. Ready for **GitHub Pages**. No npm install, frameworks, or paid hosting required.

## Files
- `index.html` — page and interactive iPhone demonstration
- `styles.css` — styles for desktop, tablet, phone
- `script.js` — song rating flow and beta signup integration
- `assets/` — original Wavelength album artwork extracted from the supplied design screenshot and favicon

## Preview locally
Open `index.html` in your browser, or run `python3 -m http.server 8000` from this directory and visit `http://localhost:8000`.

## Publish on GitHub Pages
1. Create a **public** repository, e.g. `wavelength`.
2. Upload the **contents** of this directory (not the ZIP) to the root of the repository, or commit and push with Git.
3. Visit your repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**; set **main** and **/(root)**; click **Save**.
5. Your address will be `https://YOUR-GITHUB-USERNAME.github.io/wavelength/` (unless you use a different repository name). GitHub may take several minutes to publish.

## Connect beta signups to Google Sheets
The form layout and client-side validation work now. **The form does not collect submissions until you connect your Google Apps Script URL.** In `script.js`, set `GOOGLE_SHEETS_WEB_APP_URL` to your deployed Apps Script `/exec` link. Your script must accept form POST fields `name`, `email`, and `source`. Do not paste API secrets, account credentials, or private access tokens into a public GitHub repository.

If your original Framer form used a different backend, its webhook URL and field mapping may need adjusting. If a request is sent with Google's cross-origin `no-cors` mode, the site cannot reliably confirm that Google Sheets actually stored the entry; verify a test row in the Sheet after setup.

## Interactive demo
Press **Rate this listen** or **try it out!**, choose a rating from 1–5, then **Save to diary**. This is a demo only; it does not store user song ratings in a database.
