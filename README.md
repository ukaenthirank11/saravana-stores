# Divine Collection

A responsive premium e-commerce storefront and installable mobile web app for spiritual, temple and decorative products in Malaysia.

## Front-end

The customer and admin interfaces are framework-free:

- `index.html` — semantic page shell and metadata
- `styles.css` — complete responsive design system
- `app.js` — catalog, navigation, filters, wishlist, cart, API checkout and admin interactions
- `assets/` — the original supplied product photographs and catalogue reference images
- `public/manifest.webmanifest` and `public/sw.js` — installable app and offline storefront shell

No React, Next.js, Tailwind or front-end runtime dependencies are used.

## FastAPI commerce service

The backend in `backend/app/main.py` provides:

- server-side product, stock, delivery and promotion validation;
- SQLite-backed orders for a single-instance deployment;
- Stripe-hosted Checkout Sessions for cards, FPX and eligible wallets;
- raw-body Stripe webhook signature verification;
- a clearly labelled demo payment mode for previews.

The browser never sends trusted prices and never receives Stripe secret keys or raw card data.

## Local preview

Install the Python dependencies once:

```text
python -m pip install -r backend/requirements.txt
```

Then use two terminals:

```text
npm run dev:api
npm run dev
```

Open `http://localhost:3000`. On a supported mobile browser, choose **Install app** or **Add to Home Screen**.

## Enable Stripe payments

Copy `backend/.env.example` to `backend/.env`, then set:

```text
PAYMENT_MODE=stripe
FRONTEND_URL=https://your-store.example
ALLOWED_ORIGINS=https://your-store.example
STRIPE_SECRET_KEY=sk_live_or_test_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

Configure Stripe to send Checkout events to:

```text
https://your-api.example/api/payments/stripe/webhook
```

For a production storefront, set the front-end worker's `FASTAPI_ORIGIN` to the deployed HTTPS address of this API.

## Validation

```text
npm run build
npm test
```

The optional Drizzle schema and migrations model customers, products, categories, carts, wishlists, orders, addresses, payments, reviews, coupons and admin users for a future multi-instance database deployment.
