/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { text, usedPrefix, command }) => {

    if (!text) throw `where is the path?\n\nexample:\n${usedPrefix + command} plugins/menu.js`
    try {
    if (!m.quoted.text) throw `reply code`
    let path = `${text}`
    await require('fs').writeFileSync(path, '/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/\n\n' + m.quoted.text)
  var name = m.sender
  var fkonn = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${await conn.getName(name)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  await conn.reply(m.chat, `Saved ${path} to file!`, fkonn)
  } catch (error) {
    console.log(error)
    m.reply("🐱 Reply Code Lol_-")
  }
}

handler.help = ['savefile', 'sf'].map(v => v + ' <path>')
handler.tags = ['owner']
handler.command = ['savefile', 'sf']

handler.owner = true
module.exports = handler