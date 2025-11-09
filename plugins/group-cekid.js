/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, {conn}) => {
m.reply(`*ID GROUP:*\n${await m.chat}`)
}
handler.help = ['idgc','gcid','cekid']
handler.tags = ['group']
handler.command = /^(idgc|gcid|cekid)$/i
handler.group = true

module.exports = handler