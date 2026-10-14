# Utilora — GitHub-ready package

This package contains the main site, 30 editorial tool landing pages, policy/contact pages, `robots.txt`, `sitemap.xml`, and `ads.txt`.

## Deploy
1. Upload **the contents** of this folder to the root of the GitHub repository (not the outer folder itself).
2. Keep `index.html`, `script.js`, `style.css`, `ads.txt`, `robots.txt`, and `sitemap.xml` at the repository root. Keep `assets/utilora-logo.png` and all `tools/` and policy folders.
3. Commit and push; wait for your hosting platform to deploy.
4. Test `/`, `/tools/word-counter/`, `/privacy-policy/`, `/terms/`, `/contact/`, `/robots.txt`, `/sitemap.xml`, and `/ads.txt`.
5. Submit `https://utilora.fun/sitemap.xml` in Google Search Console.

## Important AdSense notes
- The AdSense loader is included on the editorial tool landing pages, where substantial explanatory content is available. It is intentionally not loaded on the interactive single-page workspace, which changes state dynamically and may otherwise show ads on tool-only screens.
- This does **not** guarantee AdSense approval. Review the policy status in AdSense, the site's real content and ownership, traffic quality, and all ad settings before requesting review.
- For users in the EEA, UK, and Switzerland, configure a Google-certified CMP integrated with the IAB TCF in AdSense Privacy & messaging when serving personalized ads. Do not use this package as a substitute for that setup.
- Confirm the privacy policy reflects the actual hosting, logging, advertising, analytics, and consent tools you use.
- The site uses the publisher ID already present in the provided project: `ca-pub-1319864662465454`. Verify that this is your publisher ID before deployment.

## Project structure
- `index.html`, `script.js`, `style.css`: interactive home/tool workspace
- `tools/<slug>/index.html`: individual explanatory landing pages
- `guides/`, `about/`, `contact/`, `privacy-policy/`, `terms/`: supporting pages
- `robots.txt`, `sitemap.xml`, `ads.txt`: crawler and publisher files
