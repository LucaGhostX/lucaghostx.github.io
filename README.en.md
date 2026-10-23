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
├── LICENSE                          # Repository license (Dual License: MIT + Proprietary)
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

## 7. License & Terms of Use (Dual License)

This repository is distributed under a **Dual License** model distinguishing between the open-source technical codebase and the creator's personal identity (see [`LICENSE`](./LICENSE)):

### A. Source Code (MIT License)
The complete technical codebase — including HTML, CSS, JavaScript ([`link/app.js`](./link/app.js)), configuration structures ([`link/config.json`](./link/config.json)), and layout architecture — is licensed under the open-source **[MIT License](./LICENSE)**. Anyone is free to inspect, fork, modify, or use this code as a foundation for their own personal websites or link aggregators.

### B. Personal Identity, Brand & Avatar (All Rights Reserved)
The following assets are **strictly excluded** from the MIT License and remain the exclusive intellectual and proprietary property of **LucaGhostX**:
1. **Profile picture / avatar** ([`link/assets/avatar.webp`](./link/assets/avatar.webp)) and any graphic artwork or photo depicting LucaGhostX.
2. **The pseudonym, nickname, brand, and handle "LucaGhostX"**.
3. **Personal biographical descriptions and custom copy**.

> [!IMPORTANT]
> **Fork & Reuse Condition**: Anyone who clones or forks this repository to deploy their own page **MUST replace the `avatar.webp` image, the name "LucaGhostX", and all social links with their own identity** before publishing online. Any unauthorized use of the avatar or name for impersonation, plagiarism, or promotional purposes is strictly prohibited.

### C. Third-Party Trademarks
All third-party brand names, trademarks, and logos used in icons (YouTube, Twitch, Discord, Instagram, TikTok, GitHub, X, Threads, Spotify, Reddit, Telegram) belong to their respective owners and are used strictly for identification and hyperlinking purposes (*nominative fair use*).
