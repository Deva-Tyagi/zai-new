# Villa Luxe Parallax React Site

Implementation of a 3-section parallax site using React, Tailwind CSS and GSAP ScrollTrigger.

Setup

- Install dependencies:

```powershell
cd c:\Users\TSE9\OneDrive\Desktop\zai2
npm install
```

- Required libraries (already in `package.json` or add if missing):
  - `gsap`
  - `react-lazy-load-image-component`
  - `react-intersection-observer`
  - `clsx` (optional)
  - `prop-types` (optional)

Run

```powershell
npm run dev
```

Where to replace images

- Replace images in `public/assets/images/` (or `src/assets/images/`) using the exact filenames:
  - `hero-bg.png`
  - `hero-overlay.png`
  - `hero-villa.png`
  - `mid-waterfall.png`
  - `mid-right-bg.png`
  - `mid-house.png`
  - `final-full-bg.png`
  - `final-left-home.png`
  - `final-waterfall-right.png`
  - `final-mid-bg-strip.png`
  - `final-grass.png`

Tuning depths

- Depths are set on `ParallaxLayer`'s `depth` prop. Typical values:
  - deep background: `0.12`–`0.2`
  - mid layers: `0.3`–`0.5`
  - foreground: `0.7`–`0.9`

Performance notes

- Uses `will-change: transform` and `translate3d`.
- Images are lazy-loaded.
- CSS respects `prefers-reduced-motion`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
