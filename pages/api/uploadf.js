import { fileTypeFromBuffer } from "file-type"
import FormData from "form-data"
import fetch from "node-fetch"

export const config = {
  api: {
    bodyParser: false, // karena kita terima raw buffer
  },
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    // Baca raw buffer
    const chunks = []
    for await (const chunk of req) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    const f = await fileTypeFromBuffer(buffer)
    if (!f) return res.status(400).json({ error: "Gagal deteksi file type" })

    // Buat file virtual
    const file = new File([buffer], `${Date.now()}.${f.ext}`, { type: f.mime })

    // Form upload
    const form = new FormData()
    form.append("upfile", file)

    const origin = "https://uploadf.com"
    const r = await fetch(origin + "/upload.php", {
      method: "POST",
      body: form,
    })

    if (!r.ok) {
      return res.status(r.status).json({ error: r.statusText })
    }

    const fileId = "/" + r.url.split("/").pop()
    const downloadUrl = origin + "/file" + fileId
    const web = origin + "/s" + fileId
    const qr = downloadUrl + ".qr"

    return res.status(200).json({ downloadUrl, qr, web })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
      }
