const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, ".."
);
const slidesDir = path.join(projectRoot, "slides");
const outputJson = path.join(projectRoot, "slides.json");
const distDir = path.join(projectRoot, "dist");
const distSlidesDir = path.join(distDir, "slides");
const distSlidesJson = path.join(distDir, "slides.json");
const templatesJson = path.join(projectRoot, "templates.json");
const distTemplatesJson = path.join(distDir, "templates.json");
const distIndex = path.join(distDir, "index.html");

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
  const templatesPayload = JSON.stringify(
    entries.map((src, index) => {
      const filePath = path.join(projectRoot, src);
      let name = `Template ${index + 1}`;
      try {
        const html = fs.readFileSync(filePath, "utf8");
        const match = html.match(new RegExp("<title>(.*?)</title>", "i"));
        if (match && match[1]) {
          name = match[1].trim();
        }
      } catch (error) {
        console.warn(`Could not read title for ${src}`);
      }
      return {
        id: `template-${index + 1}`,
        name,
        src,
      };
    }),
    null,
    2
  );
  fs.writeFileSync(outputJson, payload);
  fs.writeFileSync(distSlidesJson, payload);
  fs.writeFileSync(templatesJson, templatesPayload);
  fs.writeFileSync(distTemplatesJson, templatesPayload);

  console.log(`Slides detectees: ${entries.length}`);
}

function prepareDist() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(path.join(projectRoot, "index.html"), distIndex);
  fs.cpSync(slidesDir, distSlidesDir, { recursive: true });
}

prepareDist();
generateSlidesList();
