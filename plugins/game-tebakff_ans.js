/** !! THIS CODE GENERATE BY ALLY !! **/

let similarity = require('similarity')
const threshold = 0.72
let handler = m => m

handler.before = async function(m) {
    this.tbkepep = this.tbkepep || {}
    let id = m.chat

    // Cek jika user reply ke pesan bot yang merupakan soal
    if (
        !m.quoted || 
        !m.quoted.fromMe || 
        !m.quoted.isBaileys || 
        !m.text || 
        !this.tbkepep[id] || 
        m.quoted.id !== this.tbkepep[id][0].id
    ) return

    let [msg, json, poin, timeoutId] = this.tbkepep[id]

    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
    if (isSurrender) {
        clearTimeout(timeoutId)
        delete this.tbkepep[id]
        return this.reply(m.chat, '*Yah Menyerah :( !*', m)
    }

    if (m.text.toLowerCase() === json.name.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += poin
        global.db.data.users[m.sender].money += 100000

        await conn.sendImageAsSticker(m.chat, './src/media/image/true.webp', m, { packname, author })
        setTimeout(() => {
            conn.reply(m.chat, `*+ 100.000 Balance*`, m)
        }, 3000)

        clearTimeout(timeoutId)
        delete this.tbkepep[id]
    } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) {
        m.reply(`❗ *Dikit Lagi!*`)
    } else {
        await conn.sendImageAsSticker(m.chat, './src/media/image/false.webp', m, { packname, author })
    }

    return !0
}
handler.exp = 0

module.exports = handler