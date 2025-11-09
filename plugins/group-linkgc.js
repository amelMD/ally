/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn }) => {
  try {
    conn.reply(m.chat, `– LINK GROUP\n- Name: ${await conn.getName(m.chat)}\n- Link: https://chat.whatsapp.com/` + await conn.groupInviteCode(m.chat) + `\n\n${set.footer}`, m)
  } catch {
    conn.reply(m.chat, `Jadikan @${conn.user.jid.split('@')[0]} sebagai admin untuk menggunakan perintah ini!`, m, { mentions: [conn.user.jid] })
  }
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(g(c)?ro?up)?$/i

handler.group = true
handler.admin = true

module.exports = handler