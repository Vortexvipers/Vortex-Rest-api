// pages/api/speedtest.js

import axios from 'axios';

export const config = {
  runtime: 'nodejs',
  maxDuration: 30, // Maksimal waktu eksekusi (Vercel limit)
  memory: 1024,
};

// Fungsi format kecepatan
const formatSpeed = (bytesPerSec) => {
  if (bytesPerSec <= 0) return '0 Mbps';
  const mbits = (bytesPerSec * 8) / (1024 * 1024);
  return mbits >= 1 
    ? `${mbits.toFixed(1)} Mbps` 
    : `${(mbits * 1000).toFixed(1)} Kbps`;
};

// Fungsi utama speed test
export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method tidak didukung.' });
  }

  const startTime = performance.now();

  let uploadSpeed = 0;
  let ping = 0;
  let networkInfo = { location: 'N/A', org: 'N/A' };

  // === Upload Test (ke Cloudflare) ===
  try {
    const url = 'https://speed.cloudflare.com/__up';
    const data = '0'.repeat(10 * 1024 * 1024); // 10MB dummy data
    const uploadStart = performance.now();
    await axios.post(url, data, {
      headers: { 'Content-Length': data.length.toString() },
      timeout: 30000,
    });
    const uploadDuration = (performance.now() - uploadStart) / 1000;
    uploadSpeed = data.length / (uploadDuration || 1);
  } catch (err) {
    console.warn('Upload test gagal:', err.message);
  }

  // === Ping Test (ke Google) ===
  try {
    const pingStart = performance.now();
    await axios.get('https://www.google.com', { timeout: 10000 });
    ping = Math.round(performance.now() - pingStart);
  } catch (err) {
    console.warn('Ping test gagal:', err.message);
  }

  // === Informasi Jaringan (IP Info) ===
  try {
    const ipRes = await axios.get('https://ipinfo.io/json', { timeout: 10000 });
    if (ipRes.status === 200) {
      const data = ipRes.data;
      networkInfo.location = `${data.city || 'N/A'}, ${data.country || 'N/A'}`;
      networkInfo.org = (data.org || 'N/A').replace(/^AS\d+\s?/i, '');
    }
  } catch (err) {
    console.warn('Gagal ambil info jaringan:', err.message);
  }

  // === Hasil Akhir ===
  const totalDuration = ((performance.now() - startTime) / 1000).toFixed(1);
  const formattedTime = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).replace(',', '');

  const result = {
    upload: formatSpeed(uploadSpeed),
    ping: `${ping} ms`,
    server: networkInfo.location,
    provider: networkInfo.org,
    duration: `${totalDuration} sec`,
    time: formattedTime,
  };

  // Kirim respons JSON
  return res.status(200).json({
    success: true,
    result,
  });
}
