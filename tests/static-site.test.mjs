import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("uses a framework-free 24-product storefront", async () => {
  const [html, css, js, packageJson] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("styles.css", root), "utf8"),
    readFile(new URL("app.js", root), "utf8"),
    readFile(new URL("package.json", root), "utf8")
  ]);

  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<link rel="stylesheet" href="styles\.css">/);
  assert.match(html, /<script src="app\.js" defer><\/script>/);
  assert.match(html, /manifest\.webmanifest/);
  assert.match(css, /\.product-card/);
  assert.match(js, /Brass Lotus Multi Diya Urli Stand/);
  assert.match(js, /Mahalakshmi Decorative Wall Plate/);
  assert.match(js, /Lord Shiva Meditation Statue/);
  assert.match(js, /Brass Lord Ganesha Idol/);
  assert.match(js, /const MAX_CATALOG_PRODUCTS = 24/);
  assert.equal((js.match(/\bproduct\(\{/g) || []).length, 24);
  assert.match(js, /"Diyas & Lighting", 4/);
  assert.match(js, /"Pooja Essentials", 7/);
  assert.match(js, /"Divine Idols", 6/);
  assert.doesNotMatch(js, /3 FIT LION DIVINE|GOLDEN BLACK 3 FIT DIVINE|USB STONE LIGHTING/);
  assert.match(js, /INR/);
  assert.match(js, /<img class="product-image product-photo/);
  assert.doesNotMatch(js, /photo-free product artwork/);
  assert.match(js, /commerce-proof/);
  assert.match(js, /spotlight-grid/);
  assert.match(js, /product-assurance/);
  assert.match(js, /class="card-add"/);
  assert.match(html, /data-nav="shop"><span>▱<\/span><small>Products<\/small>/);
  assert.doesNotMatch(js, /\/assets\/Screenshot|codex-clipboard|divine-products-reference|crop:/);
  assert.doesNotMatch(html, /og:image|twitter:image|\/assets\/Screenshot/);
  assert.match(js, /\/api\/checkout\/session/);
  assert.match(js, /serviceWorker\.register/);
  assert.doesNotMatch(packageJson, /react|next|vinext|tailwind/i);
});

test("build output contains all 24 supplied product photographs", async () => {
  for (const path of [
    "dist/client/index.html",
    "dist/client/styles.css",
    "dist/client/app.js",
    "dist/client/public/manifest.webmanifest",
    "dist/client/public/sw.js",
    "dist/client/public/products/brass-lotus-multi-diya-urli-stand.png",
    "dist/client/public/products/brass-lord-ganesha-idol.png",
    "dist/client/public/products/lord-shiva-meditation-statue.png"
  ]) {
    await access(new URL(path, root));
  }

  const builtHtml = await readFile(new URL("dist/client/index.html", root), "utf8");
  assert.match(builtHtml, /styles\.css\?v=original-png-v1/);
  assert.match(builtHtml, /app\.js\?v=original-png-v1/);
  const productImage = await readFile(new URL("dist/client/public/products/brass-lotus-multi-diya-urli-stand.png", root));
  assert.deepEqual([...productImage.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});

test("maps each numbered source photograph to one storefront product", async () => {
  const mapping = JSON.parse(await readFile(new URL("assets/Products/product-image-map.json", root), "utf8"));
  const sourceFiles = (await readdir(new URL("assets/Products/", root))).filter(file => /^\d+\.png$/i.test(file)).sort((a, b) => Number.parseInt(a) - Number.parseInt(b));
  const mappedSources = mapping.map(item => item.source).sort((a, b) => Number.parseInt(a) - Number.parseInt(b));
  const js = await readFile(new URL("app.js", root), "utf8");

  assert.equal(mapping.length, 24);
  assert.deepEqual(sourceFiles, Array.from({ length: 24 }, (_, index) => `${index + 1}.png`));
  assert.deepEqual(mappedSources, sourceFiles);
  assert.equal(new Set(mapping.map(item => item.product_id)).size, 24);

  for (const item of mapping) {
    await access(new URL(`assets/Products/${item.source}`, root));
    await access(new URL(`dist/client${item.public_asset}`, root));
    assert.match(js, new RegExp(item.product_id));
  }
});

test("uses a fresh offline cache for product photos", async () => {
  const serviceWorker = await readFile(new URL("public/sw.js", root), "utf8");
  assert.match(serviceWorker, /saravana-stores-v11/);
  assert.match(serviceWorker, /url\.pathname\.startsWith\("\/products\/"\)/);
});
