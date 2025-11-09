/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn }) => {
  let wm = global.wm
  let _uptime = process.uptime() * 1000
  let uptimex = clockString(_uptime)
  let pp = await conn.profilePictureUrl(`6282179160880@s.whatsapp.net`,'image')
  let fkontak = {
    key: {
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  };
  let msg = `*${layout.xl}  I N F O - B O T*

• Nama:  *${set.bot}*
• Mode: *${global.opts['self'] ? 'Self' : 'Publik'}*
• Aktif: *${uptimex}*
• Pengguna: *${Object.keys(global.db.data.users).length}*
• Pengguna Terbanned: *${Object.values(global.db.data.users).filter(user => user.banned).length}*
• Jumlah Pesan: *${Object.keys(db.data.chats).length}*
• Jumlah Fitur: *${Object.values(global.plugins).filter((v) => v.help && v.tags).length}*
• Status: *${conn.user.jid === null ? 'Offline' : 'Online'}*

Jika ingin membeli *Script Bot* ini bisa hubungi nomor dibawah ini ya! 

Harga ⤵️
*60.000 IDR*

Nomor ⤵️
*wa.me/6282179160880*`;
  await conn.sendFile(m.chat, pp, '', msg, fkontak, adReply)
 await conn.sendContact1(m.chat, [{
    name: 'Radit',
    number: '6282179160880',
    about: 'Owner & Creator'
  }], m, {
    org: 'Rodots Support',
    website: 'https://github.com/JackGG12345',
    email: 'rodotzmail@gmail.com'
 })
}

handler.help = ['infobot']
handler.tags = ['main']
handler.command = /^(infobot)$/i
handler.limit = false

module.exports = handler

function clockString(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000))
  let daysms = ms % (24 * 60 * 60 * 1000)
  let hours = Math.floor((daysms) / (60 * 60 * 1000))
  let hoursms = ms % (60 * 60 * 1000)
  let minutes = Math.floor((hoursms) / (60 * 1000))
  let minutesms = ms % (60 * 1000)
  let sec = Math.floor((minutesms) / 1000)
  return `${days} Hari ${hours} Jam ${minutes} Menit ${sec} Detik`
}