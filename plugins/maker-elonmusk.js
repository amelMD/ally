/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw "Berikan Argumen"
m.react("🕒")
try {
let elonmusk = await fetchJson(`https://anabot.my.id/api/ai/text2elon?prompt=${text}&apikey=${api.ana}`)
conn.sendFile(m.chat, elonmusk.url, m)
} catch(e) {
m.reply(`Error`)
console.log(e)
}
}
rodotz.help = ["elon"]
rodotz.tags = ["maker"]
rodotz.command = ["elon"]
module.exports = rodotz