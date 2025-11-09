/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
      let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.reply('Lu ngetag siapa tolol')
  let tag = `@${who.split("@")[0]}`;
for (let i = 0; i < 10; i++) {
m.reply(tag)
}
}
rodotz.command = ["spam"]
module.exports = rodotz