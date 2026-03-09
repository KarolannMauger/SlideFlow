const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, ".."
);
const slidesDir = path.join(projectRoot, "slides");
const outputJson = path.join(projectRoot, "slides.json");
const distDir = path.join(projectRoot, "dist");
const distSlidesDir = path.join(distDir, "slides");
const distVendorReveal = path.join(distDir, "vendor", "reveal");
const distSlidesJson = path.join(distDir, "slides.json");
const distIndex = path.join(distDir, "index.html");
const revealDist = path.join(
  projectRoot,
  "node_modules",
  "reveal.js",
  "dist"
);
const vendorReveal = path.join(projectRoot, "vendor", "reveal");

function ensureRevealDist() {
  if (!fs.existsSync(revealDist)) {
    console.error(
      "Reveal.js introuvable. Lance d'abord: npm install"
    );
    process.exit(1);
  }
}

function copyRevealDist() {
  fs.rmSync(vendorReveal, { recursive: true, force: true });
  fs.mkdirSync(vendorReveal, { recursive: true });
  fs.cpSync(revealDist, vendorReveal, { recursive: true });
}

function generateSlidesList() {
  if (!fs.existsSync(slidesDir)) {
    console.error("Dossier slides/ introuvable.");
    process.exit(1);
  }

  const files = fs
    .readdirSync(slidesDir)
    .filter((file) => file.endsWith(".html"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const entries = files.map((file) => `slides/${file}`);
  const payload = JSON.stringify(entries, null, 2);
  fs.writeFileSync(outputJson, payload);
  fs.writeFileSync(distSlidesJson, payload);

  console.log(`Slides detectees: ${entries.length}`);
}

function prepareDist() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(path.join(projectRoot, "index.html"), distIndex);
  fs.cpSync(slidesDir, distSlidesDir, { recursive: true });
  fs.cpSync(vendorReveal, distVendorReveal, { recursive: true });
}

ensureRevealDist();
copyRevealDist();
prepareDist();
generateSlidesList();
