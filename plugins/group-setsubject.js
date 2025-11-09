/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, usedPrefix, text, isROwner, isOwner }) => { 
   if (!text) throw `Contoh pemakaian: ${usedPrefix}setsubject ${namabot}`
   await conn.groupUpdateSubject(m.chat, text) 
  m.reply(`Nama grup telah diubah menjadi *${text ? `${text}*` : 'None'}`) 
} 
rodotz.help = ['setsubject'] 
rodotz.tags = ['group'] 
rodotz.command = /^(setsubject)$/i 
rodotz.botAdmin = true 
rodotz.group = true 
rodotz.admin = true 
module.exports = rodotz