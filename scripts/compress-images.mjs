import sharp from "sharp";
import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";

const base = "public/assets";

// Target max widths per asset (displayed size x ~2 for retina).
const maxWidths = {
  "hero-brownie.png": 1200,
  "hero-brownie-34.png": 1200,
  "tradicional.png": 800,
  "recheado.png": 800,
  "personalizado.png": 800,
  "story-kitchen.jpg": 1400,
  "story-texture.jpg": 1600,
  "events-table.jpg": 1800,
  "events-box.jpg": 1200,
  "events-detail.jpg": 1400,
  "ingredients.jpg": 1600,
  "store.jpg": 1600,
  "open-graph.jpg": 1200,
};

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(base).filter((f) => /\.(png|jpe?g)$/i.test(f));
let before = 0;
let after = 0;

for (const f of files) {
  const name = basename(f);
  const width = maxWidths[name] ?? 1400;
  const buf = readFileSync(f);
  before += buf.length;
  let img = sharp(buf).resize({ width, withoutEnlargement: true });
  if (extname(f).toLowerCase() === ".png") {
    img = img.png({ compressionLevel: 9, quality: 82, effort: 8 });
  } else {
    img = img.jpeg({ quality: 72, mozjpeg: true });
  }
  const out = await img.toBuffer();
  writeFileSync(f, out);
  after += out.length;
  console.log(`${name}  ${Math.round(buf.length / 1024)}KB -> ${Math.round(out.length / 1024)}KB`);
}

console.log(
  `TOTAL  ${Math.round(before / 1024 / 1024)}MB -> ${Math.round((after / 1024 / 1024) * 10) / 10}MB`,
);
