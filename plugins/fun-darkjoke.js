/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let { Darkjokes } = require('dhn-api')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.reply(status.wait)
  let a = Darkjokes()
  let b = layout.xl + ' Dark Jokes Meme'
  await conn.sendFile(m.chat, a, '', b, m)
}
handler.help = ["darkjoke"]
handler.tags = ["fun"]
handler.command = ["darkjoke", "darkjokes"]
handler.limit = true
module.exports = handler