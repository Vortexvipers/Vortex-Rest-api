/*
  API : TikTok Search (random video)
  Deploy : Next.js (Vercel)
  Author : daxz
*/

import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed, use GET" });
  }

  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const response = await axios({
      method: "POST",
      url: "https://tikwm.com/api/feed/search",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": "current_language=en",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      },
      data: {
        keywords: q,
        count: 10,
        cursor: 0,
        HD: 1,
      },
    });

    const videos = response.data.data.videos;
    if (!videos || videos.length === 0) {
      return res.status(404).json({ error: "Tidak ada video ditemukan." });
    }

    const rnd = Math.floor(Math.random() * videos.length);
    const videorndm = videos[rnd];

    const result = {
      title: videorndm.title,
      cover: videorndm.cover,
      origin_cover: videorndm.origin_cover,
      no_watermark: videorndm.play,
      watermark: videorndm.wmplay,
      music: videorndm.music,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
      }
