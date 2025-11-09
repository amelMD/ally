/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw "Sebutkan namanya saja"
try {
m.react("🕒")
let res = await fetchJson("https://api.siputzx.my.id/api/ai/dukun?content=" + text)
m.reply(res.data)
} catch(e) {
m.reply("Error...")
}
}
rodotz.help = ["dukun"]
rodotz.tags = ["ai"]
rodotz.command = ["dukun"]
module.exports = rodotz