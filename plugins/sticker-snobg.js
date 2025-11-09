/** !! THIS CODE GENERATE BY ALLY !! **/

const uploadImage = require('../lib/uploadImage')
let handler = async (m, { 
  conn,
  text,
  usedPrefix,
  command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Kirim Gambarnya`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    try {
    m.react('🕒')
    let img = await q.download()
    let url = await scrap.uploader(img)
    let nobg = await fetchBuffer(`https://api.ryzendesu.vip/api/ai/removebg?url=${url.data.url}`)
    conn.sendSticker(m.chat, nobg, m, {
      packname: global.set.packname,
      author: global.set.author
    })
} catch(e) {
m.reply('Error...')
}
}
handler.help = ['snobg']
handler.tags = ['sticker']
handler.command = ['snobg']

handler.limit = true

module.exports = handler