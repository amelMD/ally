/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = await conn.profilePictureUrl(who).catch(_ => './src/avatar_contact.png')
  let name = m.sender
    var fkonn = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {})
      },
      message: {
        contactMessage: {
          displayName: `${await conn.getName(name)}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
     }
    }
    const sentMsg = await conn.sendContact(m.chat, [
      [`${own.no}`, `${await conn.getName(own.no + '@s.whatsapp.net')}`],
      [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`]
    ], m)
    var caption = `👋 Halo *@${m.sender.split("@")[0]}* itu owner ${set.author}, jangan dispam yah kak`
    await conn.reply(m.chat, caption, sentMsg, { mentions: conn.parseMention(caption) }, { quoted: fkonn })
}
handler.help = ['creator', 'owner']
handler.tags = ['info', 'main']
handler.command = /^(creator|owner)$/i

module.exports = handler