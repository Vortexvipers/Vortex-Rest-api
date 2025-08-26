/*
  • Snack Video Downloader API
  • Author : SaaOfc's
*/

import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const payload = new URLSearchParams({
      id: url,
      locale: "en",
      "ic-request": "true",
      "ic-element-id": "main_page_form",
      "ic-id": "1",
      "ic-target-id": "active_container",
      "ic-trigger-id": "main_page_form",
      "ic-current-url": "/",
      "ic-select-from-response": "#id1",
      method: "POST",
    });

    const { data } = await axios.post(
      "https://getsnackvideo.com/results",
      payload.toString(),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    const $ = cheerio.load(data);
    const download = $(".download_link.without_watermark").attr("href");

    if (!download) {
      return res.status(404).json({ error: "Download link not found" });
    }

    return res.status(200).json({
      status: "success",
      download,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
        }
