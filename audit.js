const { spawn } = require("child_process");

function runAudit() {
  console.log("🔍 Running auditjs...");

  const audit = spawn("npx", ["auditjs", "ossi"], { stdio: "inherit", shell: true });

  audit.on("close", (code) => {
    if (code === 0) {
      console.log("✅ No vulnerabilities found.");
    } else {
      console.error("❌ Vulnerabilities detected!");
      process.exit(code);
    }
  });
}

runAudit();
