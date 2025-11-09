/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn, text, isOwner }) => {
   
   let user = await global.db.data.users[m.sender]
   if (!text) return m.reply('*Masukkan nama grupnya*')
   try{
    let group = await conn.groupCreate(text, [m.sender])
    let link = await conn.groupInviteCode(group.gid)
    let url = 'https://chat.whatsapp.com/' + link;
 /// console.log(chalk.bold.red('Membuat Grup: ' + group.gid + '\nNama Grup: ' + text + '\n\nViolet'))
    m.reply('_Berhasil Membuat Grup *' + text + '*_\n\n◦ *Nama:* ' + text + '\n◦ *ID:* ' + group.gid + '\n◦ *Link:* ' + url)
       } catch (e) {
    let [namagc, partici] = text.split('|')
    if (!namagc) throw 'Format Salah'
    if (!partici) throw 'Tag salah satu user sebagai member baru'
    let mem = conn.parseMention(`@${parseInt(m.sender)} ${partici}`)
    let ha = await conn.groupCreate(namagc, mem).catch(console.error)
    console.log(JSON.stringify(ha));
    await m.reply(`*Pembuat Grup*

\`\`\`Grup telah dibuat @${m.sender.replace(/@.+/, '')}\`\`\`


${JSON.stringify(ha.participants)}`)
     conn.groupMakeAdmin(ha.gid, [m.sender])
   if (!isOwner) {
      await conn.modifyChat(ha.gid, 'delete', {
            includeStarred: false
          }).catch(console.error)
         conn.groupLeave(ha.gid)
    }
  }
}
handler.help = ['buatgrup']
handler.tags = ['owner']
handler.command = /^((create|buat)(gc|grup|group))$/
handler.rowner = true
module.exports = handler