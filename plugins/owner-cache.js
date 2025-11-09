/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { usedPrefix, command, conn, text }) => {
  let noReg = Object.values(global.db.data.users).filter(user => user.registered == false)
  let user = db.data.users
  for (let data in user) {
  if (user[data].registered === false) {
    delete user[data];
  } 
  }
  conn.reply(m.chat, `*Sukses membersihkan user yang tidak Registrasi* [ \`\`\`${noReg.length }\`\`\` ]`, status)
}

handler.help = ['clearcache']
handler.tags = ['owner']
handler.command = /^(clearcache)$/i
handler.rowner = true

module.exports = handler