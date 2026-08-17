export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      if (!env.FASTAPI_ORIGIN) {
        return Response.json(
          {
            ok: false,
            detail: "The FastAPI commerce origin has not been connected to this storefront.",
            site: "Divine Collection",
            stack: "HTML, CSS, JavaScript + FastAPI"
          },
          { status: 503 }
        );
      }
      const apiUrl = new URL(`${url.pathname}${url.search}`, env.FASTAPI_ORIGIN);
      const apiRequest = new Request(apiUrl, request);
      return fetch(apiRequest);
    }

    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404 || !["GET", "HEAD"].includes(request.method)) {
      if (asset.ok && url.pathname.startsWith("/products/") && url.pathname.endsWith(".png")) {
        const headers = new Headers(asset.headers);
        headers.set("Content-Type", "image/png");
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers });
      }
      return asset;
    }

    const fallback = new Request(new URL("/index.html", request.url), request);
    return env.ASSETS.fetch(fallback);
  }
};
