# NexVerse-IITM — Society Website (Unofficial Recreation)

A faithful recreation of the official **[NexVerse-IITM](https://www.nexverse-iitm.com/)** tech society website, built with **pure HTML, CSS & vanilla JavaScript** — no frameworks, no build tools. Built as a society interview task.

> ⚠️ This is an unofficial student recreation made for learning/interview purposes. All branding, photos and content belong to NexVerse-IITM.

**🔗 Live demo:** *https://nexverse-iitm.vercel.app/*

---

## 📄 Pages

| Page | File | What's inside |
|---|---|---|
| **Home** | `index.html` | Hero with society logo, glitch title, animated count-up stats, marquee |
| **About** | `about.html` | Society story, mission/vision/values cards, 4 pillars, count-up numbers |
| **Team** | `team.html` | Real team data rendered from JS — faculty, core, heads & co-heads |
| **Events** | `events.html` | NexHack 2.0 featured event, **live countdown**, 8 tracks, timeline, past events, **NexHack 1.0 photo gallery with lightbox** |

## ✨ Features

- 🎨 Pixel-retro dark theme matching the official site's design language (neon pink/cyan/yellow, `Press Start 2P`)
- ⏳ **Live countdown timer** to NexHack 2.0 (Sep 25, 2026, IST) with live/completed states
- 🔢 **Count-up animations** for stats via `IntersectionObserver` + `requestAnimationFrame`
- 🖼️ **Photo gallery + lightbox** (keyboard navigation: `←` `→` `Esc`, scroll lock)
- 👥 Data-driven team rendering (`js/team-data.js`) — edit one file to update the whole team page
- 📱 Fully responsive with hamburger menu (`aria-expanded` synced)
- ♿ Accessibility: `prefers-reduced-motion` support, `aria-hidden` decorative tickers, skip-friendly markup, lazy-loaded images
- 🎞️ Scroll-reveal animations, glitch text effect, marquees, sticky blur header

## 🧱 Tech Stack

HTML5 · CSS3 (custom properties, grid, animations) · Vanilla JS (IntersectionObserver, timers, DOM templating)

## 📁 Structure

```
nexverse/
├── index.html          # Home (hero + logo)
├── about.html          # About us
├── team.html           # Team
├── events.html         # Events
├── css/
│   └── style.css       # Shared stylesheet
├── js/
│   ├── script.js       # Nav, reveals, countdown, count-up, lightbox
│   └── team-data.js    # Team data + card renderer
└── assets/
    ├── logo.jpg, favicon.png
    ├── team/           # Team photos (webp)
    └── gallery/        # NexHack 1.0 event photos (webp)
```

## 🚀 Run Locally

No build step needed. Either:

```bash
# 1. Just open index.html in a browser, or
# 2. Serve it (recommended):
python3 -m http.server 8080
# then visit http://localhost:8080
```

## 🌐 Deploy to GitHub Pages (free)

1. Push this repo to GitHub
2. Repo → **Settings → Pages → Source: `Deploy from a branch` → `main` → `/ (root)` → Save**
3. Wait a minute, your site is live at `https://<username>.github.io/nexverse/`

## 🙏 Credits

- Official site: [nexverse-iitm.com](https://www.nexverse-iitm.com/)
- Instagram: [@nexverse_iitm](https://www.instagram.com/nexverse_iitm/)
- Font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
