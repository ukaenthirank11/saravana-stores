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
await cp(resolve(root, "assets"), resolve(client, "assets"), { recursive: true });
await cp(resolve(root, "worker", "index.js"), resolve(server, "index.js"));
await cp(resolve(root, "worker", "wrangler.json"), resolve(server, "wrangler.json"));

await mkdir(resolve(dist, ".openai"), { recursive: true });
await cp(resolve(root, ".openai", "hosting.json"), resolve(dist, ".openai", "hosting.json"));
await cp(resolve(root, "drizzle"), resolve(dist, ".openai", "drizzle"), { recursive: true });

const html = await readFile(resolve(client, "index.html"), "utf8");
if (!html.includes("Divine Collection") || !html.includes("/app.js") || !html.includes("/styles.css") || !html.includes("/manifest.webmanifest")) {
  throw new Error("Static storefront build is incomplete.");
}

await writeFile(resolve(dist, "BUILD_COMPLETE"), "Divine Collection vanilla HTML/CSS/JS build\n");
console.log("Divine Collection static build completed.");
