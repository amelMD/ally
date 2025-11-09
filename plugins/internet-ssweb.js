/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let fetch = require('node-fetch')

let handler = async (m, { conn, command, args, text }) => {
   if (!/^https?:\/\//.test(text)) throw 'Masukan *URL* dengan http:// atau https://'
   m.react('🕒')
   m.reply('*WARNING*\n\nJika result yang diberikan tidak sesuai silahkan ulangi lagi ya')
   let img = await (await fetch(`https://image.thum.io/get/${text}`)).buffer()

   conn.sendMessage(m.chat, { image: img, caption: `_*${set.footer}*_\n🔗 *Link:* ${text}` }, { quoted: m })
}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^(ssweb)$/i
handler.limit = true

module.exports = handler