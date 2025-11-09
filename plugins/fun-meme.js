/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let { JalanTikusMeme } = require('dhn-api')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(status.wait)
  let a = JalanTikusMeme()
  let b = layout.xl + ' Random Meme'
  await conn.sendFile(m.chat, a, '', b, m)
}
handler.help = ["meme"]
handler.tags = ["fun"]
handler.command = ["meme", "randomeme"]
handler.limit = true
module.exports = handler