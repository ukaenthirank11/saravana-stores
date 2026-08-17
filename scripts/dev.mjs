import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const port = Number(process.env.PORT || 3000);
const apiOrigin = process.env.FASTAPI_ORIGIN || "http://127.0.0.1:8000";
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".webmanifest": "application/manifest+json; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml" };

async function proxyApi(request, response, url) {
  try {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const body = chunks.length ? Buffer.concat(chunks) : undefined;
    const upstream = await fetch(new URL(`${url.pathname}${url.search}`, apiOrigin), {
      method: request.method,
      headers: {
        "accept": request.headers.accept || "application/json",
        "content-type": request.headers["content-type"] || "application/json",
        "stripe-signature": request.headers["stripe-signature"] || "",
        "x-forwarded-host": request.headers.host || "localhost:3000"
      },
      body
    });
    const payload = Buffer.from(await upstream.arrayBuffer());
    response.writeHead(upstream.status, {
      "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(payload);
  } catch {
    response.writeHead(503, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    response.end(JSON.stringify({ detail: "The FastAPI commerce service is not running." }));
  }
}

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
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname.startsWith("/api/")) {
    await proxyApi(request, response, url);
    return;
  }
  const file = await findFile(url.pathname.slice(1));
  response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  createReadStream(file).pipe(response);
}).listen(port, "::", () => console.log(`Local: http://localhost:${port}/`));
