// pages/api/pinghost.js
import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  // Validasi: URL harus ada
  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'Parameter "url" tidak ditemukan. Contoh: /api/pinghost?url=google.com',
    });
  }

  let host;
  try {
    // Pastikan URL valid
    host = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
  } catch (err) {
    host = url; // fallback jika parsing gagal
  }

  try {
    const apiUrl = `https://api.vreden.my.id/api/tools/check-ping?url=${encodeURIComponent(host)}`;
    
    const { data: result } = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000, // 10 detik timeout
    });

    if (result.status !== 200 || !result.result || result.result.length === 0) {
      return res.status(400).json({
        success: false,
        message: result.message || 'Gagal melakukan ping. Host tidak valid atau tidak merespons.',
      });
    }

    const results = result.result;
    const targetIp = results[0].ping_check.ip_web;

    // Format hasil
    const response = {
      success: true,
      host,
      ip: targetIp,
      pings: results.map(res => ({
        server: `${res.server.city}, ${res.server.country}`,
        ping_ms: (res.ping_check.ping * 1000).toFixed(2),
        result: res.ping_check.result,
      })),
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Ping API Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat melakukan ping.',
      error: error.message,
    });
  }
}

// Hanya izinkan GET
export const config = {
  api: {
    externalResolver: true,
  },
};
