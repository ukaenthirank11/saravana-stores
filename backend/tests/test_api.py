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
os.environ["FRONTEND_URL"] = "http://localhost:3001"

from fastapi.testclient import TestClient  # noqa: E402
from app.main import PRODUCTS, app  # noqa: E402


CUSTOMER = {
    "full_name": "Ananya Raman",
    "email": "ananya@example.in",
    "phone": "+91 98765 43210",
    "address": "18 Temple Garden Road",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "postal_code": "600004",
    "country": "India",
}


class CommerceApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.client_context = TestClient(app)
        self.client = self.client_context.__enter__()

    def tearDown(self) -> None:
        self.client_context.__exit__(None, None, None)

    def test_health_and_exact_24_product_catalogue(self) -> None:
        health = self.client.get("/api/health")
        self.assertEqual(health.status_code, 200)
        self.assertEqual(health.json()["payment_mode"], "demo")
        self.assertTrue(health.json()["ok"])

        response = self.client.get("/api/products")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["currency"], "INR")
        catalogue = payload["products"]
        self.assertEqual(len(catalogue), 24)
        self.assertEqual({item["id"] for item in catalogue}, set(PRODUCTS))
        self.assertTrue(all(item["currency"] == "INR" for item in catalogue))

        urli = next(item for item in catalogue if item["id"] == "brass-lotus-multi-diya-urli-stand")
        self.assertEqual(urli["price"], "8999.00")
        ganesha = next(item for item in catalogue if item["id"] == "brass-lord-ganesha-idol")
        self.assertEqual(ganesha["price"], "2299.00")

    def test_demo_checkout_uses_server_prices_and_persists_order(self) -> None:
        response = self.client.post(
            "/api/checkout/session",
            json={
                "items": [
                    {"product_id": "brass-lotus-multi-diya-urli-stand", "quantity": 1},
                    {"product_id": "decorative-brass-aarti-spoon", "quantity": 1},
                    {"product_id": "brass-lord-ganesha-idol", "quantity": 1},
                ],
                "delivery": "standard",
                "promo_code": "DIVINE8",
                "customer": CUSTOMER,
            },
        )
        self.assertEqual(response.status_code, 200, response.text)
        checkout = response.json()
        self.assertEqual(checkout["mode"], "demo")
        self.assertEqual(checkout["currency"], "INR")
        self.assertEqual(checkout["total"], "11796.00")
        self.assertIsNone(checkout["total_myr"])
        self.assertIn("order-success", checkout["checkout_url"])

        order = self.client.get(f"/api/orders/{checkout['order_id']}")
        self.assertEqual(order.status_code, 200)
        self.assertEqual(order.json()["status"], "paid_demo")
        self.assertEqual(order.json()["total"], "11796.00")

    def test_removed_and_unknown_products_are_rejected(self) -> None:
        for product_id in ("3-fit-lion-divine", "invented-product"):
            response = self.client.post(
                "/api/checkout/session",
                json={
                    "items": [{"product_id": product_id, "quantity": 1}],
                    "delivery": "economy",
                    "customer": CUSTOMER,
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
                    "items": [{"product_id": "brass-lotus-deepam-set-of-3", "quantity": 1}],
                    "delivery": "economy",
                    "customer": CUSTOMER,
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
