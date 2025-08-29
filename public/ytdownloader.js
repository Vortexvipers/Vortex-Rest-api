/*
  base   : https://ssvid.net/
  update : 28 agustus 2025
  note   : bisa langsung masukin url youtube
           atau query di dalam fungsi .download
           format tersedia : mp3, 360p, 720p, 1080p
  node   : v24.5.0
  by     : wolep
*/

const yt = {
  get baseUrl() {
    return { origin: 'https://ssvid.net' }
  },
  get baseHeaders() {
    return {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'origin': this.baseUrl.origin,
      'referer': this.baseUrl.origin + '/youtube-to-mp3'
    }
  },
  validateFormat(userFormat) {
    const validFormat = ['mp3', '360p', '720p', '1080p']
    if (!validFormat.includes(userFormat)) throw Error(`invalid format!. available formats: ${validFormat.join(', ')}`)
  },
  handleFormat(userFormat, searchJson) {
    this.validateFormat(userFormat)
    let result
    if (userFormat == 'mp3') {
      result = searchJson.links?.mp3?.mp3128?.k
    } else {
      let selectedFormat
      const allFormats = Object.entries(searchJson.links.mp4)
      const quality = allFormats.map(v => v[1].q).filter(v => /\d+p/.test(v)).map(v => parseInt(v)).sort((a, b) => b - a).map(v => v + 'p')
      if (!quality.includes(userFormat)) {
        selectedFormat = quality[0]
        console.log(`format ${userFormat} gak ada. fallback ke ${selectedFormat}`)
      } else {
        selectedFormat = userFormat
      }
      const find = allFormats.find(v => v[1].q == selectedFormat)
      result = find?.[1]?.k
    }
    if (!result) throw Error(`${userFormat} gak ada`)
    return result
  },
  async hit(path, payload) {
    const body = new URLSearchParams(payload)
    const opts = { headers: this.baseHeaders, body, method: 'post' }
    const r = await fetch(`${this.baseUrl.origin}${path}`, opts)
    if (!r.ok) throw Error(`${r.status} ${r.statusText}\n${await r.text()}`)
    return await r.json()
  },
  async download(queryOrYtUrl, userFormat = 'mp3') {
    this.validateFormat(userFormat)
    let search = await this.hit('/api/ajax/search', {
      "query": queryOrYtUrl, "cf_token": "", "vt": "youtube"
    })
    if (search.p == 'search') {
      if (!search?.items?.length) throw Error(`hasil pencarian ${queryOrYtUrl} tidak ada`)
      const { v } = search.items[0]
      const videoUrl = 'https://www.youtube.com/watch?v=' + v
      search = await this.hit('/api/ajax/search', { "query": videoUrl, "cf_token": "", "vt": "youtube" })
    }
    const vid = search.vid
    const k = this.handleFormat(userFormat, search)
    const convert = await this.hit('/api/ajax/convert', { k, vid })
    if (convert.c_status == 'CONVERTING') {
      let attempt = 0, limit = 5, convert2
      do {
        attempt++
        convert2 = await this.hit('/api/convert/check?hl=en', { vid, b_id: convert.b_id })
        if (convert2.c_status == 'CONVERTED') return convert2
        await new Promise(r => setTimeout(r, 5000))
      } while (attempt < limit)
      throw Error('file belum siap')
    } else {
      return convert
    }
  }
}

async function handleDownload(e) {
  e.preventDefault()
  const url = document.getElementById('yturl').value.trim()
  const format = document.getElementById('format').value
  const statusBox = document.getElementById('status')
  statusBox.innerText = '⏳ Memproses...'
  try {
    const result = await yt.download(url, format)
    if (result?.dlink) {
      statusBox.innerHTML = `✅ Selesai!<br>Judul: ${result.title}<br>
        <a href="${result.dlink}" target="_blank" style="color:blue;">Klik untuk download</a>`
    } else {
      statusBox.innerText = 'Gagal mendapatkan link download'
    }
  } catch (err) {
    statusBox.innerText = '❌ Error: ' + err.message
  }
}

// listener ke form
document.getElementById('downloadForm').addEventListener('submit', handleDownload)
