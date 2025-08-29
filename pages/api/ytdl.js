/*
  base   : https://ssvid.net/
  update : 28 agustus 2025
  note   : API untuk download Youtube (mp3, 360p, 720p, 1080p)
  deploy : Next.js (Vercel)
  by     : wolep
*/

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { url, format = "mp3" } = req.query
  if (!url) return res.status(400).json({ error: "parameter ?url= wajib" })

  try {
    const yt = {
      baseUrl: { origin: "https://ssvid.net" },
      baseHeaders: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        origin: "https://ssvid.net",
        referer: "https://ssvid.net/youtube-to-mp3",
      },
      validateFormat(userFormat) {
        const validFormat = ["mp3", "360p", "720p", "1080p"]
        if (!validFormat.includes(userFormat))
          throw Error(
            `invalid format!. available: ${validFormat.join(", ")}`
          )
      },
      handleFormat(userFormat, searchJson) {
        this.validateFormat(userFormat)
        let result
        if (userFormat === "mp3") {
          result = searchJson.links?.mp3?.mp3128?.k
        } else {
          let selectedFormat
          const allFormats = Object.entries(searchJson.links.mp4)
          const quality = allFormats
            .map((v) => v[1].q)
            .filter((v) => /\d+p/.test(v))
            .map((v) => parseInt(v))
            .sort((a, b) => b - a)
            .map((v) => v + "p")

          if (!quality.includes(userFormat)) {
            selectedFormat = quality[0]
          } else {
            selectedFormat = userFormat
          }
          const find = allFormats.find((v) => v[1].q === selectedFormat)
          result = find?.[1]?.k
        }
        if (!result) throw Error(`${userFormat} gak ada`)
        return result
      },
      async hit(path, payload) {
        const body = new URLSearchParams(payload)
        const opts = { headers: this.baseHeaders, body, method: "POST" }
        const r = await fetch(`${this.baseUrl.origin}${path}`, opts)
        if (!r.ok) throw Error(`${r.status} ${r.statusText}`)
        return await r.json()
      },
      async download(queryOrYtUrl, userFormat = "mp3") {
        this.validateFormat(userFormat)
        let search = await this.hit("/api/ajax/search", {
          query: queryOrYtUrl,
          cf_token: "",
          vt: "youtube",
        })

        if (search.p === "search") {
          if (!search?.items?.length)
            throw Error(`hasil pencarian ${queryOrYtUrl} tidak ada`)
          const { v } = search.items[0]
          const videoUrl = "https://www.youtube.com/watch?v=" + v
          search = await this.hit("/api/ajax/search", {
            query: videoUrl,
            cf_token: "",
            vt: "youtube",
          })
        }

        const vid = search.vid
        const k = this.handleFormat(userFormat, search)
        const convert = await this.hit("/api/ajax/convert", { k, vid })

        if (convert.c_status === "CONVERTING") {
          let attempt = 0,
            limit = 5,
            convert2
          do {
            attempt++
            convert2 = await this.hit("/api/convert/check?hl=en", {
              vid,
              b_id: convert.b_id,
            })
            if (convert2.c_status === "CONVERTED") return convert2
            await new Promise((r) => setTimeout(r, 5000))
          } while (attempt < limit)
          throw Error("file belum siap")
        } else {
          return convert
        }
      },
    }

    const result = await yt.download(url, format)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
