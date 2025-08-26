// pages/api/ytmp3.js

import axios from 'axios';
import { addRequestApi } from '../../utils/addRequestApi.js';

export default async function handler(req, res) {
  // Hanya izinkan metode GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  // Validasi: pastikan URL diberikan
  if (!url) {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  const convertUrl = 'https://www.youtubemp3.ltd/convert';
  const params = 'url=' + encodeURIComponent(url);

  const headers = {
    Connection: 'keep-alive',
    'sec-ch-ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua-mobile': '?1',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
    'sec-ch-ua-platform': '"Android"',
    Origin: 'https://www.youtubemp3.ltd',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    Referer: 'https://www.youtubemp3.ltd/id',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
  };

  try {
    const response = await axios.post(convertUrl, params, { headers });
    
    // Kembalikan data hasil konversi
    await addRequestApi('YouTube Downloader Ytmp3');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error converting video:', error.message);
    res.status(500).json({
      error: 'Failed to convert video',
      details: error.message,
    });
  }
}

// Nonaktifkan bodyParser karena kita tidak butuh body parsing di GET
export const config = {
  api: {
    bodyParser: false,
  },
};
