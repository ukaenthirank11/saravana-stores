import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

for (const file of ["index.html", "styles.css", "app.js"]) {
  await cp(resolve(root, file), resolve(client, file));
}

await cp(resolve(root, "public"), client, { recursive: true });
const productImageMap = JSON.parse(await readFile(resolve(root, "assets", "Products", "product-image-map.json"), "utf8"));
await mkdir(resolve(client, "products"), { recursive: true });
for (const item of productImageMap) {
  await cp(resolve(root, "assets", "Products", item.source), resolve(client, "products", `${item.product_id}.png`));
}
await cp(resolve(root, "worker", "index.js"), resolve(server, "index.js"));
await cp(resolve(root, "worker", "wrangler.json"), resolve(server, "wrangler.json"));

await mkdir(resolve(dist, ".openai"), { recursive: true });
await cp(resolve(root, ".openai", "hosting.json"), resolve(dist, ".openai", "hosting.json"));
await cp(resolve(root, "drizzle"), resolve(dist, ".openai", "drizzle"), { recursive: true });

const indexPath = resolve(client, "index.html");
let html = await readFile(indexPath, "utf8");
if (!html.includes("Divine Collection") || !html.includes("/app.js") || !html.includes("/styles.css") || !html.includes("/manifest.webmanifest")) {
  throw new Error("Static storefront build is incomplete.");
}
html = html
  .replace('href="/styles.css"', 'href="/styles.css?v=original-png-v1"')
  .replace('src="/app.js"', 'src="/app.js?v=original-png-v1"');
await writeFile(indexPath, html);

await writeFile(resolve(dist, "BUILD_COMPLETE"), "Divine Collection vanilla HTML/CSS/JS build\n");
console.log("Divine Collection static build completed.");
