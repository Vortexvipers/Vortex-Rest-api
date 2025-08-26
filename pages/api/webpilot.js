// pages/api/webpilot.js

import axios from 'axios';

export default async function handler(req, res) {
  // Hanya izinkan method GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  // Ambil query dari query parameter
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.post(
      'https://api.webpilotai.com/rupee/v1/search',
      {
        q: query,
        threadId: '',
      },
      {
        headers: {
          authority: 'api.webpilotai.com',
          accept: 'application/json, text/plain, */*, text/event-stream',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          authorization: 'Bearer null', // Ganti dengan env var jika perlu
          'cache-control': 'no-cache',
          'content-type': 'application/json;charset=UTF-8',
          origin: 'https://www.webpilot.ai',
          pragma: 'no-cache',
          referer: 'https://www.webpilot.ai/',
          'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        },
      }
    );

    let chat = '';
    const source = [];

    // Parse stream response (SSE)
    response.data.split('\n').forEach((line) => {
      if (line.startsWith('data:')) {
        try {
          const json = JSON.parse(line.slice(5).trim());
          if (json.type === 'data' && json.data?.section_id === undefined && json.data?.content) {
            chat += json.data.content;
          }
          if (json.action === 'using_internet' && json.data) {
            source.push(json.data);
          }
        } catch (e) {
          // Skip invalid JSON lines (common in SSE)
        }
      }
    });

    // Kirim hasil sebagai JSON
    return res.status(200).json({
      query: query,
      chat: chat.trim(),
      source,
    });
  } catch (error) {
    console.error('WebPilot API Error:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch data from WebPilot',
      details: error.message,
    });
  }
}

// Konfigurasi opsional
export const config = {
  api: {
    bodyParser: false, // Tidak perlu body parsing untuk GET
  },
};
