// kill-port.js
const { exec } = require("child_process");

const port = 4000; // bisa kamu ganti sesuai kebutuhan

exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
  if (err || !stdout) {
    console.log(`⚠️  Tidak ada proses yang jalan di port ${port}`);
    return;
  }

  const lines = stdout.trim().split("\n");
  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];

    exec(`taskkill /PID ${pid} /F`, (err2) => {
      if (!err2) {
        console.log(`✅ Proses ${pid} di port ${port} berhasil dimatikan`);
      } else {
        console.log(`⚠️ Gagal mematikan PID ${pid}`);
      }
    });
  });
});
