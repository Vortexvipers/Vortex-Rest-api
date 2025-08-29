// pages/api/ytsummarizer.js
import axios from "axios"
import { addRequestApi } from '../../utils/addRequestApi.js';

function generateRandomDeviceHash() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function getRandomOSName() {
  const osNames = [
    "HONOR", "Samsung", "Xiaomi", "OnePlus", "Huawei",
    "OPPO", "Vivo", "Realme", "Google", "LG",
    "Sony", "Motorola", "Nokia", "TCL", "ASUS"
  ]
  return osNames[Math.floor(Math.random() * osNames.length)]
}

function getRandomOSVersion() {
  const versions = ["8", "9", "10", "11", "12", "13", "14"]
  return versions[Math.floor(Math.random() * versions.length)]
}

function getRandomPlatform() {
  const platforms = [1, 2, 3]
  return platforms[Math.floor(Math.random() * platforms.length)]
}

async function ytsummarizer(url, { lang = "id" } = {}) {
  if (!/youtube.com|youtu.be/.test(url)) throw new Error("Invalid youtube url")

  const randomDeviceHash = generateRandomDeviceHash()
  const randomOSName = getRandomOSName()
  const randomOSVersion = getRandomOSVersion()
  const randomPlatform = getRandomPlatform()

  const { data: a } = await axios.post(
    "https://gw.aoscdn.com/base/passport/v2/login/anonymous",
    {
      brand_id: 29,
      type: 27,
      platform: randomPlatform,
      cli_os: "web",
      device_hash: randomDeviceHash,
      os_name: randomOSName,
      os_version: randomOSVersion,
      product_id: 343,
      language: "en",
    },
    { headers: { "content-type": "application/json" } }
  )

  const { data: b } = await axios.post(
    "https://gw.aoscdn.com/app/gitmind/v3/utils/youtube-subtitles/overviews?language=en&product_id=343",
    { url, language: lang, deduct_status: 0 },
    {
      headers: {
        authorization: `Bearer ${a.data.api_token}`,
        "content-type": "application/json",
      },
    }
  )

  while (true) {
    const { data } = await axios.get(
      `https://gw.aoscdn.com/app/gitmind/v3/utils/youtube-subtitles/overviews/${b.data.task_id}?language=en&product_id=343`,
      {
        headers: {
          authorization: `Bearer ${a.data.api_token}`,
          "content-type": "application/json",
        },
      }
    )

    if (data.data.sum_status === 1) return data.data
    await new Promise((res) => setTimeout(res, 1000))
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed, use GET" })
  }

  try {
    const { url, lang = "id" } = req.query
    if (!url) return res.status(400).json({ error: "Missing YouTube URL" })

    const result = await ytsummarizer(url, { lang })
    if (!result || !result.content) {
      return res.status(500).json({ error: "Failed to get summary" })
    }

    await addRequestApi('Yutube summarizer');
    return res.status(200).json({ summary: result.content })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
          }
