/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m) => {
  let poin = global.db.data.users[m.sender].stamina || 0
  m.reply(`Stamina kamu: ${poin}`)
}

handler.help = ['cekstamina']
handler.tags = ['info']
handler.command = /^cekstamina$/i
handler.register = true
handler.limit = true

module.exports = handler