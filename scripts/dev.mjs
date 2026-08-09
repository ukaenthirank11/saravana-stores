import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const port = Number(process.env.PORT || 3000);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml" };

async function findFile(pathname) {
  const cleaned = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(root, cleaned), join(root, "public", cleaned)];
  for (const file of candidates) {
    if (!file.startsWith(root)) continue;
    try { await access(file); if ((await stat(file)).isFile()) return file; } catch { /* SPA fallback */ }
  }
  return join(root, "index.html");
}

createServer(async (request, response) => {
  const file = await findFile(new URL(request.url, `http://${request.headers.host}`).pathname.slice(1));
  response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  createReadStream(file).pipe(response);
}).listen(port, "::", () => console.log(`Local: http://localhost:${port}/`));
