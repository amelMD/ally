/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { text }) => {
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  let txt = `*${layout.xl} A F K - M O D E*\n
• *@${m.sender.split`@`[0]}* is now *AFK*`
let reason = `◦ *Reason*: ${text ? text : 'None'} `
  m.reply(txt + '\n' + reason)
}
handler.help = ['afk <reason>']
handler.tags = ['main']
handler.group = true
handler.command = /^afk$/i

module.exports = handler