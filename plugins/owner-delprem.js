/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let { MessageType } = require('@whiskeysockets/baileys')
let handler = async (m, { conn, text, usedPrefix, command }) => {
  function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }
  
  if (!text) return conn.reply(m.chat, `*Example:* ${usedPrefix + command} @⁨WhatsApp⁩`, m)
  text = no(text) + "@s.whatsapp.net"
  global.db.data.users[text].premium = false
  global.db.data.users[text].premiumDate = 0
  global.db.data.users[text].limit = global.maxlimit
  conn.reply(m.chat,`*Successfully removed premium access for @${text.split('@')[0]}.*`,m,{ contextInfo: { mentionedJid: [text] } })

}
handler.help = ['unprem']
handler.tags = ['owner']
handler.command = /^(unprem|delprem)$/i
handler.mods = true
handler.fail = null
module.exports = handler