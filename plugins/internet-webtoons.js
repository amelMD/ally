/** !! THIS CODE GENERATE BY ALLY !! **/

const fetch = require("node-fetch")

let handler = async (m, { conn, text, usedPrefix: prefix, command }) => {
if (!text) return m.reply(`${prefix + command} how to fight`)
m.react("🌐")
await fetch(`https://api.diioffc.web.id/api/search/webtoons?query=${text}`).then(async (res) => {
let response = await res.json()
let teks = '*🔎 Hasil Pencarian WEBTOONS*\n\n'
for (let i of response.result) {
teks += `*◦ Judul :* ${i.judul}\n`
teks += `*◦ Genre :* ${i.genre}\n`
teks += `*◦ Author :* ${i.author}\n`
teks += `*◦ Likes :* ${i.likes}\n`
teks += `*◦ Link Url :* ${i.link}\n\n`
}
m.reply(teks)
}).catch(err => m.reply('Error 🗿'))
}
handler.help = ["webtoons"]
handler.tags = ["internet"]
handler.command = ["webtoons","webtoon"]

module.exports = handler