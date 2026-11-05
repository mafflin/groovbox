"use strict";

// Combines the screenshots in images/screenshots/ into one image for the
// README: Dark on the left, Light on the right.
// Usage: npm run screenshots

const path = require("path");
const sharp = require("sharp");

const DIR = path.resolve(__dirname, "..", "images", "screenshots");
const OUT = path.join(DIR, "grid.png");
const MODES = ["dark", "light"];

const SCALE = 0.5; // of the source screenshots
const GAP = 96; // between windows
const PAD = 96; // around the windows
const RADIUS = 16; // window corners
const SHADOW = { blur: 24, offsetY: 16, opacity: 0.35 };

const roundedRect = (w, h, fill, opacity = 1) =>
  Buffer.from(
    `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" ` +
      `rx="${RADIUS}" fill="${fill}" fill-opacity="${opacity}"/></svg>`,
  );

async function main() {
  const files = MODES.map((m) => path.join(DIR, `${m}.png`));

  const sizes = await Promise.all(files.map((f) => sharp(f).metadata()));
  const { width: srcW, height: srcH } = sizes[0];
  sizes.forEach((s, i) => {
    if (s.width !== srcW || s.height !== srcH) {
      throw new Error(
        `${path.basename(files[i])} is ${s.width}×${s.height}, ` +
          `expected ${srcW}×${srcH} like ${path.basename(files[0])}`,
      );
    }
  });

  const w = Math.round(srcW * SCALE);
  const h = Math.round(srcH * SCALE);
  const cols = MODES.length;
  const rows = 1;

  // Shadow: a blurred rounded rectangle, padded so the blur isn't clipped.
  // Two passes, because sharp always composites last: blurring in the same
  // pipeline would blur the empty canvas and leave the rectangle sharp.
  const spread = SHADOW.blur * 3;
  const shadowRect = await sharp({
    create: {
      width: w + 2 * spread,
      height: h + 2 * spread,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: roundedRect(w, h, "#000000", SHADOW.opacity),
        left: spread,
        top: spread,
      },
    ])
    .png()
    .toBuffer();
  const shadow = await sharp(shadowRect)
    .blur(SHADOW.blur / 2)
    .png()
    .toBuffer();

  const mask = roundedRect(w, h, "#ffffff");
  const windows = await Promise.all(
    files.map((f) =>
      sharp(f)
        .resize(w, h)
        .composite([{ input: mask, blend: "dest-in" }])
        .png()
        .toBuffer(),
    ),
  );

  const layers = [];
  windows.forEach((input, i) => {
    const left = PAD + (i % cols) * (w + GAP);
    const top = PAD + Math.floor(i / cols) * (h + GAP);
    layers.push({
      input: shadow,
      left: left - spread,
      top: top - spread + SHADOW.offsetY,
    });
    layers.push({ input, left, top });
  });

  await sharp({
    create: {
      width: 2 * PAD + cols * w + (cols - 1) * GAP,
      height: 2 * PAD + rows * h + (rows - 1) * GAP,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`  wrote ${path.relative(process.cwd(), OUT)}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
