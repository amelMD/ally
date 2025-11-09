/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
switch(command) {
case 'diffusion':{
if (!text) return m.reply('Apa yang ingin kamu buat?')
await conn.sendMessage(m.chat, { react: { text: "⏱️",key: m.key,}}) 
    try {
 conn.sendMessage(m.chat, { image: { url: `https://imgen.duck.mom/prompt/${encodeURIComponent(text)}`}, caption: `_Sukses Membuat ${command} Dengan Promt:\n${text}_`}, { quoted: m})
    } catch (error) {
m.reply('eror')
    }
}
break
}
}
rodotz.help = ["diffusion"]
rodotz.tags = ["ai"]
rodotz.command = ["diffusion"]
module.exports = rodotz