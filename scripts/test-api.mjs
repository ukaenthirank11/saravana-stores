import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";

const bundledPython = resolve(homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", process.platform === "win32" ? "python.exe" : "bin/python");
const python = process.env.PYTHON_EXECUTABLE || (existsSync(bundledPython) ? bundledPython : "python");
const result = spawnSync(python, ["backend/tests/test_api.py"], {
  cwd: new URL("../", import.meta.url),
  env: process.env,
  stdio: "inherit",
  shell: false
});

if (result.error) {
  console.error(`Unable to start Python. Set PYTHON_EXECUTABLE to a Python 3.12+ executable.\n${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
