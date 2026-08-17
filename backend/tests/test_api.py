from __future__ import annotations

import os
import sys
import tempfile
import unittest
from pathlib import Path


BACKEND = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND / ".python"))
sys.path.insert(0, str(BACKEND))

database_file = Path(tempfile.gettempdir()) / "divine-collection-api-tests.db"
if database_file.exists():
    database_file.unlink()
os.environ["DATABASE_PATH"] = str(database_file)
os.environ["PAYMENT_MODE"] = "demo"
os.environ["FRONTEND_URL"] = "http://localhost:3000"

from fastapi.testclient import TestClient  # noqa: E402
from app.main import app  # noqa: E402


class CommerceApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.client_context = TestClient(app)
        self.client = self.client_context.__enter__()

    def tearDown(self) -> None:
        self.client_context.__exit__(None, None, None)

    def test_health_and_catalogue(self) -> None:
        health = self.client.get("/api/health")
        self.assertEqual(health.status_code, 200)
        self.assertEqual(health.json()["payment_mode"], "demo")
        self.assertTrue(health.json()["ok"])

        products = self.client.get("/api/products")
        self.assertEqual(products.status_code, 200)
        self.assertEqual(products.json()["currency"], "MIXED")
        catalogue = products.json()["products"]
        self.assertEqual(len(catalogue), 33)
        ganesha_lamp = next(product for product in catalogue if product["id"] == "ganesha-stone-lamp")
        self.assertEqual(ganesha_lamp["price"], "1250.00")
        self.assertEqual(ganesha_lamp["currency"], "MYR")
        self.assertEqual(ganesha_lamp["stock"], 58)
        brass_urli = next(product for product in catalogue if product["id"] == "brass-lotus-multi-diya-urli-stand")
        self.assertEqual(brass_urli["price"], "8999.00")
        self.assertEqual(brass_urli["currency"], "INR")

    def test_demo_checkout_uses_server_prices_and_persists_order(self) -> None:
        response = self.client.post(
            "/api/checkout/session",
            json={
                "items": [
                    {"product_id": "3-fit-lion-divine", "quantity": 1},
                    {"product_id": "standed-steel-accessories", "quantity": 1},
                    {"product_id": "ganesha-stone-lamp", "quantity": 1},
                ],
                "delivery": "standard",
                "promo_code": "DIVINE8",
                "customer": {
                    "full_name": "Aishah Rahman",
                    "email": "aishah@example.my",
                    "phone": "+60 12-345 6789",
                    "address": "18 Jalan Damai Perdana 3",
                    "city": "Kuala Lumpur",
                    "state": "Kuala Lumpur",
                    "postal_code": "56000",
                    "country": "Malaysia",
                },
            },
        )
        self.assertEqual(response.status_code, 200, response.text)
        checkout = response.json()
        self.assertEqual(checkout["mode"], "demo")
        self.assertEqual(checkout["total_myr"], "3202.00")
        self.assertIn("order-success", checkout["checkout_url"])

        order = self.client.get(f"/api/orders/{checkout['order_id']}")
        self.assertEqual(order.status_code, 200)
        self.assertEqual(order.json()["status"], "paid_demo")
        self.assertEqual(order.json()["total_myr"], "3202.00")

    def test_inr_product_checkout_uses_rupee_pricing(self) -> None:
        response = self.client.post(
            "/api/checkout/session",
            json={
                "items": [{"product_id": "brass-lotus-multi-diya-urli-stand", "quantity": 1}],
                "delivery": "standard",
                "customer": {
                    "full_name": "Aishah Rahman",
                    "email": "aishah@example.my",
                    "phone": "+60 12-345 6789",
                    "address": "18 Jalan Damai Perdana 3",
                    "city": "Kuala Lumpur",
                    "state": "Kuala Lumpur",
                    "postal_code": "56000",
                    "country": "Malaysia",
                },
            },
        )
        self.assertEqual(response.status_code, 200, response.text)
        checkout = response.json()
        self.assertEqual(checkout["currency"], "INR")
        self.assertEqual(checkout["total"], "9098.00")
        self.assertIsNone(checkout["total_myr"])

    def test_mixed_currency_cart_is_rejected(self) -> None:
        response = self.client.post(
            "/api/checkout/session",
            json={
                "items": [
                    {"product_id": "3-fit-lion-divine", "quantity": 1},
                    {"product_id": "antique-brass-temple-bell", "quantity": 1},
                ],
                "delivery": "economy",
                "customer": {
                    "full_name": "Aishah Rahman",
                    "email": "aishah@example.my",
                    "phone": "+60 12-345 6789",
                    "address": "18 Jalan Damai Perdana 3",
                    "city": "Kuala Lumpur",
                    "state": "Kuala Lumpur",
                    "postal_code": "56000",
                    "country": "Malaysia",
                },
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("one currency", response.json()["detail"])

    def test_unknown_products_are_rejected(self) -> None:
        response = self.client.post(
            "/api/checkout/session",
            json={
                "items": [{"product_id": "invented-product", "quantity": 1}],
                "delivery": "economy",
                "customer": {
                    "full_name": "Aishah Rahman",
                    "email": "aishah@example.my",
                    "phone": "+60 12-345 6789",
                    "address": "18 Jalan Damai Perdana 3",
                    "city": "Kuala Lumpur",
                    "state": "Kuala Lumpur",
                    "postal_code": "56000",
                    "country": "Malaysia",
                },
            },
        )
        self.assertEqual(response.status_code, 400)

    def test_live_mode_refuses_checkout_without_a_stripe_key(self) -> None:
        os.environ["PAYMENT_MODE"] = "stripe"
        os.environ.pop("STRIPE_SECRET_KEY", None)
        try:
            response = self.client.post(
                "/api/checkout/session",
                json={
                    "items": [{"product_id": "lion-golden-temple", "quantity": 1}],
                    "delivery": "economy",
                    "customer": {
                        "full_name": "Aishah Rahman",
                        "email": "aishah@example.my",
                        "phone": "+60 12-345 6789",
                        "address": "18 Jalan Damai Perdana 3",
                        "city": "Kuala Lumpur",
                        "state": "Kuala Lumpur",
                        "postal_code": "56000",
                        "country": "Malaysia",
                    },
                },
            )
            self.assertEqual(response.status_code, 503)
            self.assertIn("not configured", response.json()["detail"])
        finally:
            os.environ["PAYMENT_MODE"] = "demo"

    def test_webhook_rejects_an_invalid_signature(self) -> None:
        os.environ["STRIPE_WEBHOOK_SECRET"] = "whsec_test_secret"
        try:
            response = self.client.post(
                "/api/payments/stripe/webhook",
                content=b'{"type":"checkout.session.completed"}',
                headers={"stripe-signature": "invalid"},
            )
            self.assertEqual(response.status_code, 400)
        finally:
            os.environ.pop("STRIPE_WEBHOOK_SECRET", None)


if __name__ == "__main__":
    unittest.main()
