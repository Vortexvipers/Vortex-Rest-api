import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const VER_TOKEN = 'rk1bO74A1rMAtbMgBPyvN7Ag';   // simpan di .env
  const PROJECT_ID = 'prj_P4bTOcDzMoaA9kCTdcI4RUaEsSjZ';

  let nextTs = Date.now();

  async function pollLogs() {
    try {
      const url = `https://api.vercel.com/v2/projects/${PROJECT_ID}/logs?from=${nextTs}&limit=50&direction=forward`;
      const r = await fetch(url, {
        headers: { Authorization: `Bearer ${VER_TOKEN}` },
      });
      if (!r.ok) {
        res.write(`data: ${JSON.stringify({ error: await r.text() })}\n\n`);
        return;
      }
      const data = await r.json();

      if (data && data.logs && data.logs.length > 0) {
        data.logs.forEach(log => {
          nextTs = log.timestamp + 1;
          res.write(`data: ${JSON.stringify(log)}\n\n`);
        });
      }
    } catch (err) {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    }
  }

  // loop polling setiap 3 detik
  const interval = setInterval(pollLogs, 3000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
    }
