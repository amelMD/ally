/** !! THIS CODE GENERATE BY ALLY !! **/

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
    let ress = await fetchBuffer(`https://api.popcat.xyz/wanted?image=${url.data.url}`)
    conn.sendFile(m.chat, ress, '', set.footer, m)
} catch(e) {
m.reply('Error...')
}
}
handler.help = ['wanted']
handler.tags = ['maker']
handler.command = ['wanted']

handler.limit = true

module.exports = handler