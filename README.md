# SlideFlow

Live demo: https://karolannmauger.github.io/SlideFlow/

Clean Reveal.js-based HTML presentation with automatic slide discovery.

## Features

- Fullscreen support (button or `F`)
- Keyboard navigation (left/right, PageUp/PageDown, space)
- Auto-detects slides from `slides/`
- Simple GitHub Pages deployment

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
- `vendor/reveal/` (local Reveal.js assets)

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

## Deploy (Render)

Use a **Static Site** with:

- Build command: `npm install && npm run build`
- Publish directory: `dist`

## Notes

- Slides are loaded in `iframe`s to keep each slide's CSS/JS isolated.
- The presentation content can be in French; the UI remains minimal and language-agnostic.
