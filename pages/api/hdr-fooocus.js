// pages/api/upscale.js
/* 
• Scrape AI Upscale Image (Next.js API Endpoint)
• Author : SaaOfc's
*/

import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed, use POST" });
  }

  try {
    const { image, scale = 2, faceEnhance = true } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image (base64) is required" });
    }

    if (scale < 2 || scale > 10) {
      return res.status(400).json({ error: "Scale harus antara 2 sampai 10" });
    }

    // Kirim request ke fooocus.one
    const start = await axios.post(
      "https://fooocus.one/api/predictions",
      {
        version:
          "f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa",
        input: {
          face_enhance: faceEnhance,
          image: image,
          scale,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/107.0.0.0 Safari/537.36",
          Origin: "https://fooocus.one",
          Referer: "https://fooocus.one/id/apps/batch-upscale-image",
        },
      }
    );

    const predictionId = start.data.data.id;

    let result;
    while (true) {
      const check = await axios.get(
        `https://fooocus.one/api/predictions/${predictionId}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/107.0.0.0 Safari/537.36",
            Referer: "https://fooocus.one/id/apps/batch-upscale-image",
          },
        }
      );

      if (check.data.status === "succeeded") {
        result = check.data.output;
        break;
      } else if (check.data.status === "failed") {
        return res.status(500).json({ error: "Upscale gagal" });
      }

      await new Promise((r) => setTimeout(r, 3000));
    }

    return res.status(200).json({
      success: true,
      output: result,
    });
  } catch (err) {
    console.error("error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
