/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn }) => {
  let res = await conn.groupRevokeInvite(m.chat)
  let gruf = m.chat
  conn.reply(m.sender, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(gruf), m)
}
handler.help = ['revoke','resetlink']
handler.tags = ['group']
handler.command = /^(revoke|resetlink)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler