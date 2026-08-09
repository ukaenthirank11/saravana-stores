import { spawn } from "node:child_process";

const python = process.env.PYTHON_EXECUTABLE || "python";
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
