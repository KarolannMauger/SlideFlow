# SlideFlow

Local-first HTML slide builder and player. Drag, drop, reorder, and present in a clean full-screen view — all in the browser.

Live demo: https://karolannmauger.github.io/SlideFlow/

## Features

- Landing page with live template previews
- Choose slide count (cover included)
- Drag & drop HTML slides
- Reorder slides via drag and drop
- Full-screen player with keyboard navigation and zoom
- LocalStorage persistence (no backend)

## Requirements

- Node.js 18+ recommended

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

This generates:

- `dist/` (deployable site)
- `slides.json` (auto-generated from `slides/`)
- `templates.json` (template metadata from slide titles)

## Local Dev

```bash
npm run dev
```

Then open http://localhost:5173

## Deploy (GitHub Pages)

```bash
npm run deploy
```

This publishes `dist/` to the `gh-pages` branch. In GitHub, set Pages to:

- Source: `Deploy from a branch`
- Branch: `gh-pages`
- Folder: `/ (root)`

## Notes

- All data stays in your browser via `localStorage`.
- Templates are the HTML files inside `slides/`.
- Images referenced by URL must be publicly accessible to render for everyone.
