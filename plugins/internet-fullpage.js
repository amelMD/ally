/** !! THIS CODE GENERATE BY ALLY !! **/

let fetch = require('node-fetch')

let handler = async (m, { conn, command, args, text }) => {
   if (!/^https?:\/\//.test(text)) throw 'Masukan *URL* dengan http:// atau https://'
  m.react('🕒')
   let img = await (await fetch(`https://image.thum.io/get/fullpage/${text}`)).buffer()

   conn.sendMessage(m.chat, { image: img, caption: `_*${set.footer}*_\n🔗 *Link:* ${text}` }, { quoted: m })
}
handler.help = ['fullpage']
handler.tags = ['internet']
handler.command = /^(fullpage)?f?$/i
handler.limit = true

module.exports = handler