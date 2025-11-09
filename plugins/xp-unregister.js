/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let { createHash } = require('crypto')
let handler = async function (m, { args, usedPrefix, command }) {
  if (!args[0]) throw `📮Serial Number kosong, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw `🚫Serial Number salah!, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`
  user.registered = false
  user.unreg = true
  m.reply('📛Kamu Berhasil keluar dari database\n\n' + set.footer)
}
handler.help = ['unreg']
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true

module.exports = handler