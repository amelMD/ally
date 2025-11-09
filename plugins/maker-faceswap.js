/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

const uploadImage = require('../lib/uploadImage')
let handler = async (m, { 
  conn,
  text,
  usedPrefix,
  command
}) => {
    if (!text) throw 'Mana Urlnya'
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Kirim Url Gambar`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    try {
    m.react('🕒')
    let img = await q.download()
    let url = await Uploader.catbox(img)
    let ress = await fetchBuffer(`https://api.ryzendesu.vip/api/ai/faceswap?original=${url}&face=${text}`)
    conn.sendFile(m.chat, ress, '', set.footer, m)
} catch(e) {
m.reply('Error...')
}
}
handler.help = ['faceswap']
handler.tags = ['maker']
handler.command = ['faceswap']

handler.premium = true
handler.limit = true

module.exports = handler