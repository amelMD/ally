/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*example*: ${usedPrefix + command} you idiot @${m.sender.split`@`[0]} what about you?`, null, { mentions: [m.sender] })
  let cm = copy(m)
  let who
  if (text.includes('@0')) who = '0@s.whatsapp.net'
  else if (m.isGroup) who = cm.participant = m.mentionedJid[0]
  else who = m.chat
  if (!who) return m.reply(`*example*: ${usedPrefix + command} you idiot @${m.sender.split`@`[0]} what about you?`, null, { mentions: [m.sender] })
  cm.key.fromMe = false 
  cm.message[m.mtype] = copy(m.msg)
  let sp = '@' + who.split`@`[0]
  let [fake, ...real] = text.split(sp)
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), m.isGroup ? m.chat : false, {
    contextInfo: {
      mentionedJid: conn.parseMention(real.join(sp).trim())
    }
  })
}

handler.help = ['fake <@user> <text>','fitnah <@user> <text>']
handler.tags = ['tools']
handler.group = true
handler.command = /^(fitnah|fakereply|fake)$/i

module.exports = handler

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}