/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let fetch = require('node-fetch')
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  if (!text) return m.reply(`*Masukkan Link!*\n\nExample: ${usedPrefix + command} Link`)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  try {
  let radit = await fetch(`https://fastrestapis.fasturl.cloud/downup/capcutdown?url=${text}`)
  const res = await radit.json()
  const ok = res
 let teks = `${layout.xl}  *C A P C U T*\n\n`
    teks += `  ∘  *Title* : ${ok.result.title}\n`
    teks += `  ∘  *Description* : ${ok.result.description}\n`
    teks += `  ∘  *Digunakan* : ${ok.result.usage}`
  conn.sendFile(m.chat, ok.result.originalVideoUrl, '', teks, m)
  } catch (e) {
    console.log(e)
    return m.reply('```STATUS:```' + e)
  }
}
handler.command = handler.help = ['capcut', 'cc', 'ccdl', 'capcutdl'];
handler.tags = ['downloader'];
handler.premium = false;
handler.limit = true;

module.exports = handler;