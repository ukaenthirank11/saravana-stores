import { spawnSync } from "node:child_process";

const python = process.env.PYTHON_EXECUTABLE || "python";
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
