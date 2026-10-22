# HeroGen

Featured-image generator for client blog posts. Swap in a client's logo, set the
color block to their theme color, pick a background, type the headline — and
export a finished image at **exactly 1440 × 1080**.

## What it does

- **Custom logo** — click or drag-and-drop any SVG/PNG/JPG/WebP logo, with a size slider.
- **Color block picker** — native color picker + hex input, plus an opacity slider.
- **Background swap** — click or drag-and-drop any image (it covers the full canvas).
- **Headline** — editable text on the right side of the block.
- **Profiles** — save all of the above under a name and recall it in one click.
  Profiles can also be exported/imported as a JSON file to move between machines.
  - Desktop app: profiles are stored in `herogen-profiles.json` in the app's
    user-data folder (on Linux: `~/.config/herogen/`, macOS:
    `~/Library/Application Support/herogen/`, Windows: `%APPDATA%/herogen/`).
  - Plain browser: profiles are stored in that browser's localStorage.
- **Export** — WebP (default), PNG or JPG, always rendered at 1440 × 1080,
  filename based on the profile name / headline.

## Run it in a browser

No build step — just serve or open the folder:

```bash
npx serve .        # or: python3 -m http.server
# open index.html
```

Note: opening via `file://` also works in most browsers, but localStorage
profile storage is more reliable over `http://` or in the desktop app.

## Run the desktop app (development)

Requires Node.js 20+.

```bash
npm install
npm start
```

## Build installers (Mac / Windows / Linux)

```bash
npm install
npm run dist        # build for your current OS
npm run dist:mac    # .dmg + .zip   (must run on a Mac for a signed/usable build)
npm run dist:win    # NSIS installer + portable .exe (can cross-build from Linux/macOS)
npm run dist:linux  # AppImage + .deb
```

Output goes to `dist/`.

Cross-building notes (electron-builder):

- **macOS** builds effectively need to run on a Mac; code signing/notarization
  needs an Apple Developer certificate. Unsigned builds work locally but
  Gatekeeper will warn on first open.
- **Windows** builds can be produced from Linux/macOS; signing is optional for
  internal use (SmartScreen will warn on unsigned installers).
- **Linux** AppImage runs on most distros without installation.

## Layout

| File | Purpose |
|---|---|
| `index.html` / `style.css` / `app.js` | The generator UI and logic |
| `main.js` / `preload.js` | Electron main process + profile-file bridge |
| `bg.webp` / `logo.svg` | Bundled default background and logo |
| `vendor/html2canvas.min.js` | Vendored html2canvas 1.4.1 (MIT) — no CDN needed, works offline |
