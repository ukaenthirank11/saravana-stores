import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });

for (const file of ["index.html", "styles.css", "app.js"]) {
  await cp(resolve(root, file), resolve(client, file));
}

await cp(resolve(root, "public"), resolve(client, "public"), { recursive: true });
const productImageMap = JSON.parse(await readFile(resolve(root, "assets", "Products", "product-image-map.json"), "utf8"));
await mkdir(resolve(client, "public", "products"), { recursive: true });
for (const item of productImageMap) {
  await cp(resolve(root, "assets", "Products", item.source), resolve(client, "public", "products", `${item.product_id}.png`));
}

const indexPath = resolve(client, "index.html");
let html = await readFile(indexPath, "utf8");
if (!html.includes("Saravana Stores") || !html.includes("app.js") || !html.includes("styles.css") || !html.includes("public/manifest.webmanifest")) {
  throw new Error("Static storefront build is incomplete.");
}
html = html
  .replace('href="styles.css"', 'href="styles.css?v=original-png-v1"')
  .replace('src="app.js"', 'src="app.js?v=original-png-v1"');
await writeFile(indexPath, html);

await writeFile(resolve(dist, "BUILD_COMPLETE"), "Saravana Stores standalone HTML/CSS/JS build\n");
console.log("Saravana Stores static build completed.");
