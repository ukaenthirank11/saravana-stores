import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Divine Collection storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Divine Collection \| Premium Spiritual &amp; Decorative Products<\/title>/i);
  assert.match(html, /Bring Divine Beauty/);
  assert.match(html, /3 FIT LION DIVINE/);
  assert.match(html, /MYR(?:&nbsp;|\s)1,850\.00/);
  assert.match(html, /Premium Spiritual &amp; Decorative Products/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("supports deep links and includes production brand assets", async () => {
  const response = await render("/shop");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Divine Collection/);
  assert.match(html, /og\.png/);

  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/divine-products-reference.png", import.meta.url));
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
