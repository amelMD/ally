/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler  = async (m, { conn, usedPrefix: _p }) => {
let d = new Date(new Date + 3600000)
let locale = 'id'
const targetDate = new Date('February 28, 2025 00:00:00');
    const currentDate = new Date();
    const remainingTime = targetDate.getTime() - currentDate.getTime();
    const seconds = Math.floor(remainingTime / 1000) % 60;
    const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
    const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
    const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
    let dateCountdown = `${days} hari, ${hours} jam, ${minutes} menit lagi menuju perayaan *Puasa* !`;
    
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
let name = m.sender
let fkonn = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${await conn.getName(name)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
let img = 'https://telegra.ph/file/c1e45131e3702d2150d2f.jpg'

conn.sendMessage(m.chat, {
      text: dateCountdown,
      contextInfo: {
      forwardingScore: 99999, 
      isForwarded: true,
      externalAdReply: {
      title: `28 Februari 2025`,
      thumbnailUrl: img,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: fkonn})
}
handler.help = ['puasa']
handler.tags = ['info']
handler.command = /^(puasa)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler