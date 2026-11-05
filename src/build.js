"use strict";

const fs = require("fs");
const path = require("path");
const { getPalette } = require("./palette");
const { workbenchColors } = require("./workbench");
const { tokenColors, semanticTokenColors } = require("./syntax");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "themes");
const MODES = ["dark", "light"];

const cap = (s) => s[0].toUpperCase() + s.slice(1);

function buildTheme(mode) {
  const p = getPalette(mode);
  return {
    $schema: "vscode://schemas/color-theme",
    name: `Groovbox ${cap(mode)}`,
    type: mode,
    semanticHighlighting: true,
    colors: workbenchColors(p),
    tokenColors: tokenColors(p),
    semanticTokenColors: semanticTokenColors(p),
  };
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pkg = JSON.parse(
    fs.readFileSync(path.join(ROOT, "package.json"), "utf8"),
  );
  const declared = new Set(
    pkg.contributes.themes.map((t) => path.normalize(t.path)),
  );

  for (const mode of MODES) {
    const file = `groovbox-${mode}.json`;
    const rel = path.normalize(`./themes/${file}`);
    if (!declared.has(rel)) {
      throw new Error(
        `themes/${file} is not declared in package.json contributes.themes`,
      );
    }
    const theme = buildTheme(mode);
    fs.writeFileSync(
      path.join(OUT_DIR, file),
      JSON.stringify(theme, null, 2) + "\n",
    );
    console.log(`  wrote themes/${file}`);
  }
}

main();
