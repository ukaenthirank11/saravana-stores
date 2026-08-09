from __future__ import annotations

import os
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
LOCAL_PACKAGES = ROOT / ".python"
if LOCAL_PACKAGES.exists():
    sys.path.insert(0, str(LOCAL_PACKAGES))

import uvicorn  # noqa: E402


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        app_dir=str(ROOT),
        host=os.getenv("API_HOST", "127.0.0.1"),
        port=int(os.getenv("API_PORT", "8000")),
        reload=os.getenv("API_RELOAD", "false").lower() == "true",
    )
