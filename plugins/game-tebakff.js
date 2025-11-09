/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let fs = require('fs')
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tbkepep = conn.tbkepep ? conn.tbkepep: {}
    let id = 'tebakepep-' + m.chat
    if (id in conn.tbkepep) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tbkepep[id][0])
    let src = JSON.parse(fs.readFileSync('./json/tebakepep.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
Siapakah Karakter Diatas??

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hep untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.tbkepep[id] = [
        await conn.sendMessage(m.chat, { image: { url: json.gambar }, fileName: 'tebakgambar.jpg', mimetype: 'image/jpeg', caption: caption }, { quoted: m }),
        json, poin,
        setTimeout(() => {
            if (conn.tbkepep[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, conn.tbkepep[id][0])
            delete conn.tbkepep[id]
        }, timeout)
    ]
}
handler.help = ['tebakepep', 'tebakfreefire','tebakff']
handler.tags = ['game']
handler.command = /^tebakepep|tebakfreefire|tebakff$/i

handler.group = true

module.exports = handler