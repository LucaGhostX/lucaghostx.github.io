# lucaghostx.github.io

> 🌍 **Language / Lingua**: [Italiano (README.md)](./README.md) | **English**

Static website and link aggregator (Linktree alternative) for the official channels of **LucaGhostX**, hosted on **GitHub Pages**.

The project was developed entirely through **vibe coding** (AI-assisted engineering with iterative refinement of application logic, legal compliance, and UI aesthetics).

---

## 1. Project Overview

This repository contains a lightweight, static showcase page designed to present organized links to LucaGhostX's social, streaming, and community channels (YouTube, Twitch, Discord, Instagram, TikTok).

The primary goal of this codebase is to deliver a fast, independent alternative to third-party commercial link services (such as Linktree or HeyLink), engineered to adhere to strict privacy principles and European data protection standards.

---

## 2. Technical Architecture and Operation

The website adopts a **Client-Side Only** architecture (no backend, no application server, no database).

### Navigation Flow and Routing
- **Root (`/`)**: The [`index.html`](./index.html) file at the root handles an instantaneous client-side redirect to [`/link/`](./link/) (using `window.location.replace` and a `<meta http-equiv="refresh">` fallback tag). This preserves the base address `lucaghostx.github.io` for future use (such as a personal homepage or portfolio) without conflicting with the link aggregator.
- **Link Path (`/link/`)**: Contains the standalone web application with UI, buttons, and dynamic rendering logic.

### Separation of Data and Presentation (Zero Hardcoding)
To avoid manual HTML editing:
1. **No Hardcoded Data in [`link/index.html`](./link/index.html)**: The HTML file contains strictly semantic layout scaffolding.
2. **Centralized Configuration in [`link/config.json`](./link/config.json)**: Houses the entire dataset for the site (profile info, avatar path, active link buttons, footer socials, CSS theme tokens, and privacy policy modal texts).
3. **Dynamic Client Rendering via [`link/app.js`](./link/app.js)**: On `DOMContentLoaded`, the script fetches `config.json` locally, generates DOM nodes dynamically, inlines sanitized SVG icons, and binds interactivity.
4. **Technologies Used**: Pure semantic HTML5, Vanilla CSS, and native Vanilla JavaScript (no external frameworks, runtimes, or build steps required).

---

## 3. Legal Framework & Regulatory Compliance

The site was built adhering strictly to the **Privacy by Design and by Default** principles (Art. 25 EU Regulation 2016/679 - GDPR) and the **Directive 2002/58/EC (ePrivacy)**.

### A. Exemption from Cookie Consent Banners
Under the *EDPB Guidelines 05/2020* and European data protection authority regulations, the requirement to display a consent banner (CMP) only applies when identifiers (cookies, tracking storage, or device fingerprinting) are accessed or written on the user's terminal for non-essential purposes.
- **Zero Cookies**: The site does not generate, store, or read any cookies (`document.cookie` is never accessed).
- **Zero Web Storage**: Neither `localStorage`, `sessionStorage`, nor `IndexedDB` are utilized.
- **Legal Conclusion**: Because no data is read from or written to the user's device, **no cookie banner is legally needed or required**.

### B. No Personal Data Processing
- **Zero Logging & Telemetry**: No web analytics tools (e.g., Google Analytics), session recording tools, or tracking pixels (Meta Pixel, TikTok Pixel) are installed.
- **Zero Profiling**: No tracking across sessions, user profiling, or browser/hardware fingerprinting.
- **GitHub Pages Infrastructure**: HTTPS delivery and edge network operations are handled directly by GitHub Inc. under their standard service terms, with zero log access or processing by the creator of this repository.

### C. Self-Hosted Resources & IP Address Protection
- **No Third-Party CDNs**: No public CDNs (`cdnjs`, `unpkg`, etc.) are queried, preventing third-party servers from capturing visitor IP addresses during asset downloads.
- **No Google Fonts**: No requests are sent to `fonts.googleapis.com` or external font repositories, in accordance with European court rulings (e.g., LG München 3 O 17493/20). The site utilizes the native *System Font Stack* of the visitor's operating system.
- **Local Images and Icons**: All social icons are local SVG files located in [`link/assets/icons/socials/`](./link/assets/icons/socials/); the avatar and link buttons are local WebP files located in [`link/assets/icons/links/`](./link/assets/icons/links/). Zero external network calls.

### D. Redirection to External Platforms
Buttons on the page are standard HTML anchor links (`<a>`) equipped with `rel="noopener noreferrer"`. Upon clicking a link, the user navigates directly to third-party platforms (YouTube, Twitch, Discord, etc.), which operate under their own independent privacy policies and terms.

### E. User Transparency (Art. 13 GDPR)
The footer features an interactive badge: `Zero Cookie • 100% GDPR Compliant`. Clicking the badge opens an informative modal (with copy managed entirely via `config.json`) explaining the zero-tracking design of the page.

---

## 4. Repository Structure

```text
lucaghostx.github.io/
├── index.html                       # Immediate client-side redirect from root to /link/
├── README.md                        # Documentation in Italian
├── README.en.md                     # Documentation in English
├── LICENSE                          # Source code license (MIT License)
├── ASSETS-LICENSE.md                # License for personal identity, brand, and media assets
└── link/                            # Standalone link aggregator application
    ├── index.html                   # Semantic HTML layout without hardcoded content
    ├── style.css                    # Stylesheets, responsive layout, and transitions
    ├── app.js                       # Logic: JSON parser, dynamic rendering, and modal
    ├── config.json                  # Source data configuration (profile, links, theme)
    └── assets/                      # Local assets
        ├── avatar.webp              # LucaGhostX profile picture (All Rights Reserved)
        └── icons/                   # Local icons
            ├── links/               # Icons for link buttons (WebP format)
            └── socials/             # Scalable vector SVG icons for social channels
```

---

## 5. Maintenance and Content Updates

All adjustments to links, socials, or visual themes are made exclusively in **[`link/config.json`](./link/config.json)**.

### Adding or Modifying a Link
Each link button is defined inside the `"links"` array:
```json
{
  "id": "youtube",
  "title": "YouTube",
  "url": "https://www.youtube.com/@LucaGhostX",
  "icon": "assets/icons/links/youtube.webp",
  "active": true
}
```
- `"active"`: When set to `false`, the button is excluded from rendering without deleting its configuration.

### Footer Social Channels
Defined in the `"socials"` array. SVG icons can be added or customized inside `link/assets/icons/socials/`:
```json
{
  "platform": "youtube",
  "url": "https://youtube.com/@LucaGhostX",
  "title": "YouTube",
  "icon": "assets/icons/socials/youtube.svg",
  "active": true
}
```
If `"icon"` is omitted, the application automatically loads `assets/icons/socials/<platform>.svg`.

### Theme & Color Customization
All SVGs in `socials/` inherit `fill="currentColor"`. To change the social icons' color or hover color, you do not need to edit the SVG files: simply configure `"socialColor"` and `"socialHoverColor"` inside the `"theme"` object in `config.json`.

---

## 6. GitHub Pages Deployment

The repository is configured for automatic publishing via **GitHub Pages** tracking the `main` branch from the root `/`:
- **Root URL**: `https://lucaghostx.github.io/` (redirects to `/link/`)
- **Link Page URL**: `https://lucaghostx.github.io/link/`

---

## 7. Licensing

This repository uses separate licenses for different parts of the project:

- **Software code:** Licensed under the MIT License. See [LICENSE](LICENSE).
- **Personal identity, brand, and media assets:** All rights reserved, except where expressly authorized separately. See [ASSETS-LICENSE.md](ASSETS-LICENSE.md).

The MIT License applies only to the software code and other materials explicitly designated as MIT-licensed. It does not grant permission to use the creator's personal identity, avatar, or other expressly excluded assets.

Forks and adaptations intended for public deployment must replace the original personal identity assets, the name "LucaGhostX", and personal links with their own before publication. They must not imply endorsement or affiliation with LucaGhostX where none exists.

Third-party trademarks, logos, and other assets remain the property of their respective owners.
