/** !! THIS CODE GENERATE BY ALLY !! **/

const uploadImage = require('../lib/uploadImage')
let handler = async (m, { conn, text, usedPrefix, command }) => {
      let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah ${usedPrefix + command}`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*jenis ${mime} tidak didukung!*_`
    try {
    m.react('🕒')
    let img = await q.download()
   // let url = await uploadImage(img)
    let link = await scrap.uploader(img)
    let hasil = await fetchBuffer('https://api.ryzendesu.vip/api/ai/remini?url=' + link.data.url)
  //  m.reply(link)
 await conn.sendFile(m.chat, hasil, m)
} catch(e) {
m.reply('emror')
}
}

handler.help = ['remini']
handler.tags = ['tools', 'ai']
handler.command = /^(remini)$/i
handler.limit = true

module.exports = handler