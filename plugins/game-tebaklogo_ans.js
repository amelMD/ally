/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let similarity = require('similarity')
const threshold = 0.72

let handler = m => m
handler.before = async function(m) {
    let id = 'tebakepep-' + m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hep/i.test(m.quoted.text) || /.*hep/i.test(m.text))
        return !0
    this.tbkepep = this.tbkepep ? this.tbkepep : {}
    if (!(id in this.tbkepep))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tbkepep[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tbkepep[id][3])
            delete this.tbkepep[id]
            return m.reply('*Yah Menyerah :( !*')
        }
        let json = JSON.parse(JSON.stringify(this.tbkepep[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tbkepep[id][2]

global.db.data.users[m.sender].money += 100000

            conn.sendImageAsSticker(m.chat, './src/media/image/true.webp', m, { packname: packname, author: author })
      setTimeout(() => {
      conn.reply(m.chat, `*+ 100.000 Balance*`, m)
}, 3000)
            clearTimeout(this.tbkepep[id][3])
            delete this.tbkepep[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendImageAsSticker(m.chat, './src/media/image/false.webp', m, { packname: packname, author: author })
    }
    return !0
}
handler.exp = 0

module.exports = handler