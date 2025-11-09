/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let fetch = require('node-fetch')
let { sticker } = require('../lib/sticker.js')
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  if (!text) return m.reply(`*Masukkan Teks!*/n\nExample: ${usedPrefix + command} Hallow`)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  try {
  let radit = await fetchBuffer(`https://api-zalxzhu.vercel.app/api/tools/txtimg/attp?text=${text}`)
conn.sendSticker(m.chat, radit, m, {
      packname: global.set.packname,
      author: global.set.author
    })
  } catch (e) {
    console.log(e)
    return m.reply('[ ! ] Terjadi kesalahan')
}
}
handler.command = handler.help = ['attp'];
handler.tags = ['sticker'];
handler.register = false;
handler.limit = true;

module.exports = handler;