/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw "Nanya Opo?!"
try {
let wait = "Joko Berpikir 🤔...."
let res = await fetchJson("https://api.siputzx.my.id/api/ai/joko?text=" + text)
let { key } = await m.reply('Biarkan Joko Berpikir 🤨 ');
await conn.sendMessage(m.chat, {
      text: res.data,
      edit: key,
    });
} catch(e) {
m.reply("Maaf Joko tidak mengerti....")
}
}
rodotz.help = ["joko"]
rodotz.tags = ["ai"]
rodotz.command = ["joko"]
module.exports = rodotz