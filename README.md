# Σταύρος Φλαμουρίδης — Ψυχολόγος MSc

Greek-language professional website with a sage hero, transparent portrait, rounded service cards, expandable qualifications and an appointment request form.

**Live website:** https://stavrosflamouridis.gr/

## Development

The site is static HTML, CSS and JavaScript. All fonts and images are included in `assets/`.

Run from the repository root:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/. Edit `index.html`, `styles.css`, `script.js` and `contact.js`, then refresh the browser.

## Publishing

GitHub Pages publishes the repository root from the `main` branch. Push changes to `main` to update the website. `.nojekyll` keeps the static files unchanged during publishing.

The appointment form opens an email draft addressed to `sflamouridis@gmail.com`. The visitor reviews and sends it in their own email application; it does not automatically send messages or create calendar bookings.

Manrope's font license is included in `assets/fonts/OFL-Manrope.txt`.
