/** !! THIS CODE GENERATE BY ALLY !! **/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Contoh:\n${usedPrefix + command} Makan Sambil Kuyang Bisa Gak Pak Ustad`)
  
  await conn.sendMessage(m.chat, {
    image: { url: 'https://api.taka.my.id/tanya-ustad?quest=' + encodeURIComponent(text) }
  }, { quoted: m })
}
 
handler.command = ['pak-ustad']
handler.tags = ['maker']
handler.help = ['pak-ustad']
 
module.exports = handler