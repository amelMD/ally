/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
try { 
m.react("🕘")
let res = await fetchJson("https://api.ipify.org?format=json")
m.reply(res.ip)
} catch { 
m.reply("Error")
}
}
rodotz.help = ["myip"]
rodotz.tags = ["owner"]
rodotz.rowner = true
rodotz.command = ["myip"]
module.exports = rodotz