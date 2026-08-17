import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("uses a framework-free HTML, CSS and JavaScript storefront", async () => {
  const [html, css, js, packageJson] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("styles.css", root), "utf8"),
    readFile(new URL("app.js", root), "utf8"),
    readFile(new URL("package.json", root), "utf8")
  ]);

  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<link rel="stylesheet" href="\/styles\.css">/);
  assert.match(html, /<script src="\/app\.js" defer><\/script>/);
  assert.match(html, /manifest\.webmanifest/);
  assert.match(css, /Photo-free editorial product artwork/);
  assert.match(js, /3 FIT LION DIVINE/);
  assert.match(js, /GANESHA STONE LAMP/);
  assert.match(js, /Brass Lotus Multi Diya Urli Stand/);
  assert.match(js, /Antique Brass Temple Bell/);
  assert.match(js, /Home Décor", 33/);
  assert.match(js, /MYR/);
  assert.match(js, /INR/);
  assert.match(js, /<img class="product-image product-photo/);
  assert.match(js, /photo-free product artwork/);
  assert.doesNotMatch(js, /\/assets\/Screenshot|codex-clipboard|divine-products-reference|crop:/);
  assert.doesNotMatch(html, /og:image|twitter:image|\/assets\/Screenshot/);
  assert.match(js, /\/api\/checkout\/session/);
  assert.match(js, /serviceWorker\.register/);
  assert.doesNotMatch(packageJson, /react|next|vinext|tailwind/i);
});

test("build output contains the static site, product photography and Cloudflare worker", async () => {
  for (const path of ["dist/client/index.html", "dist/client/styles.css", "dist/client/app.js", "dist/client/manifest.webmanifest", "dist/client/sw.js", "dist/client/products/brass-lotus-multi-diya-urli-stand.png", "dist/client/products/antique-brass-temple-bell.png", "dist/server/index.js", "dist/server/wrangler.json", "dist/.openai/hosting.json"]) {
    await access(new URL(path, root));
  }

  const worker = await import(new URL(`dist/server/index.js?test=${Date.now()}`, root));
  const builtHtml = await readFile(new URL("dist/client/index.html", root), "utf8");
  assert.match(builtHtml, /styles\.css\?v=original-png-v1/);
  assert.match(builtHtml, /app\.js\?v=original-png-v1/);
  const response = await worker.default.fetch(new Request("https://example.test/api/health"), { ASSETS: { fetch: () => new Response("Not found", { status: 404 }) } });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).stack, "HTML, CSS, JavaScript + FastAPI");

  const imageResponse = await worker.default.fetch(
    new Request("https://example.test/products/brass-lotus-multi-diya-urli-stand.png"),
    { ASSETS: { fetch: () => new Response(new Uint8Array([1, 2, 3]), { headers: { "Content-Type": "application/octet-stream" } }) } }
  );
  assert.equal(imageResponse.status, 200);
  assert.equal(imageResponse.headers.get("Content-Type"), "image/png");
  assert.match(imageResponse.headers.get("Cache-Control"), /immutable/);
});

test("maps every supplied source photograph to a storefront product", async () => {
  const mapping = JSON.parse(await readFile(new URL("assets/Products/product-image-map.json", root), "utf8"));
  const sourceFiles = (await readdir(new URL("assets/Products/", root))).filter(file => /\.(png|jpe?g|webp)$/i.test(file)).sort();
  const mappedSources = mapping.map(item => item.source).sort();
  const js = await readFile(new URL("app.js", root), "utf8");

  assert.equal(mapping.length, 8);
  assert.deepEqual(mappedSources, sourceFiles);
  assert.equal(new Set(mapping.map(item => item.product_id)).size, mapping.length);

  for (const item of mapping) {
    await access(new URL(`assets/Products/${item.source}`, root));
    await access(new URL(`dist/client${item.public_asset}`, root));
    assert.match(js, new RegExp(item.product_id));
    assert.match(js, new RegExp(item.public_asset.replaceAll("/", "\\/")));
  }
});

test("publishes product photos with image headers and a fresh offline cache", async () => {
  const [headers, serviceWorker] = await Promise.all([
    readFile(new URL("public/_headers", root), "utf8"),
    readFile(new URL("public/sw.js", root), "utf8")
  ]);

  assert.match(headers, /\/products\/\*/);
  assert.match(headers, /Content-Type: image\/png/);
  assert.match(serviceWorker, /divine-collection-v9/);
  assert.match(serviceWorker, /url\.pathname\.startsWith\("\/products\/"\)/);
});
