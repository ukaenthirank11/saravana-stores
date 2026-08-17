from __future__ import annotations

import json
import os
import secrets
import sqlite3
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Literal

import stripe
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


def load_local_environment() -> None:
    env_file = Path(__file__).resolve().parents[1] / ".env"
    if not env_file.exists():
        return
    for raw_line in env_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_local_environment()


PRODUCTS = {
    "3-fit-lion-divine": {"name": "3 FIT LION DIVINE", "price_sen": 185_000, "stock": 100},
    "golden-black-3-fit-divine": {"name": "GOLDEN BLACK 3 FIT DIVINE", "price_sen": 220_000, "stock": 100},
    "lion-divine-home": {"name": "LION DIVINE HOME", "price_sen": 300_000, "stock": 200},
    "standed-steel-accessories": {"name": "STANDED STEEL ACCESSORIES", "price_sen": 19_000, "stock": 30},
    "usb-stone-lighting": {"name": "USB STONE LIGHTING", "price_sen": 150_000, "stock": 100},
    "lion-golden-temple": {"name": "LION GOLDEN TEMPLE", "price_sen": 150_000, "stock": 100},
    "sacred-arch-home-temple": {"name": "SACRED ARCH HOME TEMPLE", "price_sen": 128_000, "stock": 85},
    "royal-lion-prayer-cabinet": {"name": "ROYAL LION PRAYER CABINET", "price_sen": 275_000, "stock": 42},
    "peacock-arch-home-shrine": {"name": "PEACOCK ARCH HOME SHRINE", "price_sen": 235_000, "stock": 64},
    "wall-mounted-divine-altar": {"name": "WALL MOUNTED DIVINE ALTAR", "price_sen": 98_000, "stock": 110},
    "heritage-gopuram-temple": {"name": "HERITAGE GOPURAM TEMPLE", "price_sen": 245_000, "stock": 38},
    "compact-prayer-mandir": {"name": "COMPACT PRAYER MANDIR", "price_sen": 89_000, "stock": 120},
    "golden-pillar-temple": {"name": "GOLDEN PILLAR TEMPLE", "price_sen": 175_000, "stock": 70},
    "outdoor-devotion-shrine": {"name": "OUTDOOR DEVOTION SHRINE", "price_sen": 210_000, "stock": 31},
    "classic-pooja-cabinet": {"name": "CLASSIC POOJA CABINET", "price_sen": 265_000, "stock": 48},
    "temple-bell-set": {"name": "TEMPLE BELL SET", "price_sen": 24_000, "stock": 150},
    "stainless-pooja-thali": {"name": "STAINLESS POOJA THALI", "price_sen": 32_000, "stock": 135},
    "trishul-accessory-stand": {"name": "TRISHUL ACCESSORY STAND", "price_sen": 29_000, "stock": 74},
    "brass-diya-pair": {"name": "BRASS DIYA PAIR", "price_sen": 18_000, "stock": 180},
    "lotus-incense-holder": {"name": "LOTUS INCENSE HOLDER", "price_sen": 12_000, "stock": 210},
    "kumkum-storage-box": {"name": "KUMKUM STORAGE BOX", "price_sen": 16_000, "stock": 160},
    "led-sacred-backlight": {"name": "LED SACRED BACKLIGHT", "price_sen": 78_000, "stock": 95},
    "usb-om-arch-light": {"name": "USB OM ARCH LIGHT", "price_sen": 52_000, "stock": 125},
    "warm-temple-strip-light": {"name": "WARM TEMPLE STRIP LIGHT", "price_sen": 36_000, "stock": 140},
    "ganesha-stone-lamp": {"name": "GANESHA STONE LAMP", "price_sen": 125_000, "stock": 58},
}

DELIVERY_FEES = {"economy": 0, "standard": 1_200, "express": 3_500}
CHECKOUT_ATTEMPTS: dict[str, list[float]] = {}


class CartLine(BaseModel):
    product_id: str = Field(min_length=2, max_length=80)
    quantity: int = Field(ge=1, le=10)


class ShippingAddress(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=5, max_length=254, pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
    phone: str = Field(min_length=7, max_length=30)
    address: str = Field(min_length=5, max_length=200)
    city: str = Field(min_length=2, max_length=80)
    state: str = Field(min_length=2, max_length=80)
    postal_code: str = Field(min_length=4, max_length=12)
    country: str = Field(default="Malaysia", min_length=2, max_length=80)


class CheckoutRequest(BaseModel):
    items: list[CartLine] = Field(min_length=1, max_length=20)
    delivery: Literal["economy", "standard", "express"] = "standard"
    promo_code: str | None = Field(default=None, max_length=32)
    customer: ShippingAddress


class CheckoutResponse(BaseModel):
    mode: Literal["stripe", "demo"]
    checkout_url: str
    order_id: str
    total_myr: str
    message: str


def env_list(name: str, default: str) -> list[str]:
    return [item.strip().rstrip("/") for item in os.getenv(name, default).split(",") if item.strip()]


def database_path() -> Path:
    configured = os.getenv("DATABASE_PATH")
    path = Path(configured) if configured else Path(__file__).resolve().parents[1] / "data" / "divine.db"
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def connect_db() -> sqlite3.Connection:
    connection = sqlite3.connect(database_path())
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    with connect_db() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                status TEXT NOT NULL,
                currency TEXT NOT NULL,
                subtotal_sen INTEGER NOT NULL,
                delivery_sen INTEGER NOT NULL,
                discount_sen INTEGER NOT NULL,
                total_sen INTEGER NOT NULL,
                items_json TEXT NOT NULL,
                customer_json TEXT NOT NULL,
                stripe_session_id TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )


def now_iso() -> str:
    return datetime.now(UTC).isoformat()


def calculate_order(payload: CheckoutRequest) -> tuple[list[dict], int, int, int, int]:
    validated_items: list[dict] = []
    subtotal = 0
    for line in payload.items:
        product = PRODUCTS.get(line.product_id)
        if product is None:
            raise HTTPException(status_code=400, detail=f"Unknown product: {line.product_id}")
        if line.quantity > product["stock"]:
            raise HTTPException(status_code=409, detail=f"Only {product['stock']} units are available for {product['name']}")
        line_total = product["price_sen"] * line.quantity
        subtotal += line_total
        validated_items.append(
            {
                "product_id": line.product_id,
                "name": product["name"],
                "unit_amount_sen": product["price_sen"],
                "quantity": line.quantity,
                "line_total_sen": line_total,
            }
        )
    if subtotal > 10_000_000:
        raise HTTPException(status_code=400, detail="Order total exceeds the online checkout limit")
    delivery = DELIVERY_FEES[payload.delivery]
    promo = (payload.promo_code or "").strip().upper()
    discount = min(10_000, round(subtotal * 0.08)) if promo == "DIVINE8" else 0
    total = subtotal + delivery - discount
    return validated_items, subtotal, delivery, discount, total


def create_order(payload: CheckoutRequest, items: list[dict], subtotal: int, delivery: int, discount: int, total: int) -> str:
    order_id = f"DC-{datetime.now(UTC):%Y%m%d}-{secrets.token_hex(3).upper()}"
    timestamp = now_iso()
    with connect_db() as connection:
        connection.execute(
            """
            INSERT INTO orders (
                id, status, currency, subtotal_sen, delivery_sen, discount_sen,
                total_sen, items_json, customer_json, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                order_id,
                "pending",
                "myr",
                subtotal,
                delivery,
                discount,
                total,
                json.dumps(items),
                payload.customer.model_dump_json(),
                timestamp,
                timestamp,
            ),
        )
    return order_id


def update_order(order_id: str, status: str, stripe_session_id: str | None = None) -> None:
    with connect_db() as connection:
        connection.execute(
            "UPDATE orders SET status = ?, stripe_session_id = COALESCE(?, stripe_session_id), updated_at = ? WHERE id = ?",
            (status, stripe_session_id, now_iso(), order_id),
        )


def serialize_order(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "status": row["status"],
        "currency": row["currency"].upper(),
        "subtotal_myr": f"{row['subtotal_sen'] / 100:.2f}",
        "delivery_myr": f"{row['delivery_sen'] / 100:.2f}",
        "discount_myr": f"{row['discount_sen'] / 100:.2f}",
        "total_myr": f"{row['total_sen'] / 100:.2f}",
        "items": json.loads(row["items_json"]),
        "customer": json.loads(row["customer_json"]),
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
    }


def enforce_checkout_rate_limit(request: Request) -> None:
    client = request.client.host if request.client else "unknown"
    current = time.time()
    attempts = [stamp for stamp in CHECKOUT_ATTEMPTS.get(client, []) if current - stamp < 60]
    if len(attempts) >= 12:
        raise HTTPException(status_code=429, detail="Too many checkout attempts. Please wait a minute and try again.")
    attempts.append(current)
    CHECKOUT_ATTEMPTS[client] = attempts


def frontend_url(request: Request) -> str:
    configured = os.getenv("FRONTEND_URL", "").strip().rstrip("/")
    if configured:
        return configured
    origin = request.headers.get("origin", "").strip().rstrip("/")
    allowed = env_list("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    if origin in allowed:
        return origin
    return str(request.base_url).rstrip("/")


app = FastAPI(
    title="Divine Collection Commerce API",
    description="Server-validated catalogue, order and Stripe Checkout API for Divine Collection.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=env_list("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"),
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Stripe-Signature"],
)


@app.on_event("startup")
def startup() -> None:
    initialize_database()


@app.get("/api/health")
def health() -> dict:
    requested_mode = os.getenv("PAYMENT_MODE", "demo").lower()
    stripe_ready = bool(os.getenv("STRIPE_SECRET_KEY")) and bool(os.getenv("STRIPE_WEBHOOK_SECRET"))
    status = "ready" if requested_mode == "demo" or stripe_ready else "needs_configuration"
    return {
        "ok": status == "ready",
        "service": "Divine Collection Commerce API",
        "version": app.version,
        "payment_mode": requested_mode,
        "stripe_ready": stripe_ready,
        "status": status,
    }


@app.get("/api/products")
def products() -> dict:
    return {
        "currency": "MYR",
        "products": [
            {"id": product_id, "name": product["name"], "price_myr": f"{product['price_sen'] / 100:.2f}", "stock": product["stock"]}
            for product_id, product in PRODUCTS.items()
        ],
    }


@app.post("/api/checkout/session", response_model=CheckoutResponse)
def checkout_session(payload: CheckoutRequest, request: Request) -> CheckoutResponse:
    enforce_checkout_rate_limit(request)
    items, subtotal, delivery, discount, total = calculate_order(payload)
    order_id = create_order(payload, items, subtotal, delivery, discount, total)
    return_base = frontend_url(request)
    payment_mode = os.getenv("PAYMENT_MODE", "demo").lower()

    if payment_mode == "stripe":
        secret_key = os.getenv("STRIPE_SECRET_KEY", "")
        if not secret_key:
            update_order(order_id, "configuration_error")
            raise HTTPException(status_code=503, detail="Stripe is not configured yet. Add STRIPE_SECRET_KEY before accepting payments.")
        stripe.api_key = secret_key
        try:
            session = stripe.checkout.Session.create(
                mode="payment",
                client_reference_id=order_id,
                customer_email=payload.customer.email,
                line_items=[
                    {
                        "price_data": {
                            "currency": "myr",
                            "product_data": {
                                "name": f"Divine Collection order {order_id}",
                                "description": f"{sum(item['quantity'] for item in items)} curated piece(s), including delivery",
                            },
                            "unit_amount": total,
                        },
                        "quantity": 1,
                    }
                ],
                metadata={"order_id": order_id},
                success_url=f"{return_base}/order-success?session_id={{CHECKOUT_SESSION_ID}}&order_id={order_id}",
                cancel_url=f"{return_base}/checkout?payment=cancelled",
                billing_address_collection="required",
                phone_number_collection={"enabled": True},
                locale="auto",
            )
        except stripe.StripeError as exc:
            update_order(order_id, "payment_error")
            raise HTTPException(status_code=502, detail="The payment provider could not start checkout. Please try again.") from exc
        update_order(order_id, "awaiting_payment", session.id)
        return CheckoutResponse(
            mode="stripe",
            checkout_url=session.url,
            order_id=order_id,
            total_myr=f"{total / 100:.2f}",
            message="Continue to Stripe to complete secure payment.",
        )

    update_order(order_id, "paid_demo", f"demo_{secrets.token_urlsafe(8)}")
    return CheckoutResponse(
        mode="demo",
        checkout_url=f"{return_base}/order-success?order_id={order_id}&demo=1",
        order_id=order_id,
        total_myr=f"{total / 100:.2f}",
        message="Preview payment approved. No real charge was made.",
    )


@app.get("/api/orders/{order_id}")
def order(order_id: str) -> dict:
    with connect_db() as connection:
        row = connection.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return serialize_order(row)


@app.post("/api/payments/stripe/webhook")
async def stripe_webhook(request: Request, stripe_signature: str | None = Header(default=None)) -> dict:
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    if not webhook_secret:
        raise HTTPException(status_code=503, detail="Stripe webhook verification is not configured")
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(payload, stripe_signature or "", webhook_secret)
    except (ValueError, stripe.SignatureVerificationError) as exc:
        raise HTTPException(status_code=400, detail="Invalid Stripe webhook signature") from exc

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        order_id = session.get("client_reference_id") or session.get("metadata", {}).get("order_id")
        if order_id:
            update_order(order_id, "paid", session.get("id"))
    elif event["type"] == "checkout.session.expired":
        session = event["data"]["object"]
        order_id = session.get("client_reference_id") or session.get("metadata", {}).get("order_id")
        if order_id:
            update_order(order_id, "expired", session.get("id"))
    return {"received": True}
