import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";

const bundledPython = resolve(homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", process.platform === "win32" ? "python.exe" : "bin/python");
const python = process.env.PYTHON_EXECUTABLE || (existsSync(bundledPython) ? bundledPython : "python");
const child = spawn(python, ["backend/run.py"], {
  cwd: new URL("../", import.meta.url),
  env: process.env,
  stdio: "inherit",
  shell: false
});

child.on("error", error => {
  console.error(`Unable to start Python. Set PYTHON_EXECUTABLE to a Python 3.12+ executable.\n${error.message}`);
  process.exit(1);
});
child.on("exit", code => process.exit(code ?? 0));
