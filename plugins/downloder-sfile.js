/** !! THIS CODE GENERATE BY ALLY !! **/

const cheerio = require('cheerio');
const axios = require('axios');
const mime = require('mime-types');

const sfile = {
  createHeaders: referer => ({
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="137", "Google Chrome";v="137"',
    'dnt': '1',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'Referer': referer,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
  }),

  extractCookies: h => h['set-cookie']?.map(c => c.split(';')[0]).join('; ') || '',

  extractMetadata: $ => {
    const m = {}
    $('.file-content').eq(0).each((_, e) => {
      const x = $(e)
      m.file_name = x.find('img').attr('alt')
      m.mimetype = x.find('.list').eq(0).text().trim().split('-')[1].trim()
      m.upload_date = x.find('.list').eq(2).text().trim().split(':')[1].trim()
      m.download_count = x.find('.list').eq(3).text().trim().split(':')[1].trim()
      m.author_name = x.find('.list').eq(1).find('a').text().trim()
    })
    return m
  },

  makeRequest: async (u, o) => {
    try { return await axios.get(u, o) }
    catch (e) { if (e.response) return e.response; throw new Error(`Request gagal: ${e.message}`) }
  },

  download: async (url, resultBuffer = false) => {
    try {
      let h = sfile.createHeaders(url)
      const init = await sfile.makeRequest(url, { headers: h })
      const ck = sfile.extractCookies(init.headers)
      h.Cookie = ck
      let $ = cheerio.load(init.data)
      const meta = sfile.extractMetadata($)
      const dl = $('#download').attr('href')
      if (!dl) throw new Error('Download URL gak ketemu')
      h.Referer = dl
      const proc = await sfile.makeRequest(dl, { headers: h })
      const html = proc.data
      $ = cheerio.load(html)
      const scr = $('script').map((i, el) => $(el).html()).get().join('\n')
      const re = /https:\\\/\\\/download\d+\.sfile\.mobi\\\/downloadfile\\\/\d+\\\/\d+\\\/[a-z0-9]+\\\/[^\s'"]+\.[a-z0-9]+(\?[^"']+)?/gi
      const mt = scr.match(re)
      if (!mt?.length) throw new Error('Link download final gak ketemu di script')
      const fin = mt[0].replace(/\\\//g, '/')
      let download
      if (resultBuffer) {
        const file = await sfile.makeRequest(fin, { headers: h, responseType: 'arraybuffer' })
        download = Buffer.from(file.data)
      } else download = fin
      return { metadata: meta, download }
    } catch (e) { throw new Error(`${e.message}`) }
  }
}

let handler = async (m, { conn, args }) => {
  try {
    if (!args[0]) return m.reply('*Example :* .sfile https://sfile.mobi/2E5O1HMVKcc')
    let data = await sfile.download(args[0], true)
    let { file_name, mimetype, upload_date, download_count, author_name } = data.metadata
    let type = mime.lookup(file_name) || 'application/octet-stream'
    await conn.sendMessage(m.chat, { document: data.download, fileName: file_name, mimetype: type }, { quoted: m })
  } catch (e) { m.reply(e.message) }
}

handler.help = ['sfile']
handler.command = ['sfile']
handler.tags = ['downloader']

module.exports = handler