/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (!text) throw "[ ! ] Masukkan teks yang ingin dijadikan nama grup."
  await conn.groupUpdateSubject(m.chat, text)
 m.reply(`${text ? `${text}` : 'None'} Now is name this groups`)
}
handler.help = ['setnamegc <text>', 'setnamegroup <text>']
handler.tags = ['group']
handler.command = /^(setnamegc|setnamegroup)$/i
handler.botAdmin = true
handler.group = true
handler.admin = true
module.exports = handler