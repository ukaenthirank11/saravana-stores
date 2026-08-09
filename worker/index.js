export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, site: "Divine Collection", stack: "HTML, CSS, JavaScript" });
    }

    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404 || !["GET", "HEAD"].includes(request.method)) return asset;

    const fallback = new Request(new URL("/index.html", request.url), request);
    return env.ASSETS.fetch(fallback);
  }
};
