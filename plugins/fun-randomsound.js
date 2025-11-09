/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
switch (command) {
case 'randomsound': case 'rsound':
 let lop = await (await fetch('https://itzpire.com/random/sound-effect')).json()
 let nnd = lop.data
 let ranIndex = Math.floor(Math.random() * nnd.length);
 let sou = nnd[ranIndex]
 let cap = `🎲 *RANDOM SOUND*\n*Title:* ${sou.title}\n*Source:* ${sou.pageLink}`
 conn.sendMessage(m.chat,{audio:{url: sou.soundLink}, mimetype: 'audio/mp4'},{ quoted: m})
break
}
}
rodotz.help = ["randomsound"]
rodotz.tags = ["fun"]
rodotz.command = ["randomsound", "rsound"]
module.exports = rodotz