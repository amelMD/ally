/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `Gunakan format ${usedPrefix}${command} [username]
Contoh: ${usedPrefix}${command} jokowi
`.trim()
  try {
  let res = await fetchJson(`https://api.ryzendesu.vip/api/stalk/instagram?username=${args[0]}`)
  let iggs = `*${layout.xl} I G - S T A L K*

     • 📷 *Nickname:* ${res.name}
     • 👤 *Username:* ${res.username}
     • ❤️ *Followers:* ${res.followers}
     • 💙 *Following:* ${res.following}
     • 📅 *Posts:* ${res.posts}
     • 📝 *Bio:* ${res.bio}`.trim() // tambahin sendiri json.blablabla :)
  conn.sendFile(m.chat, res.avatar, 'error.jpg', iggs, m)
} catch(e) {
m.reply('Error')
}
}
handler.help = ['igstalk <username>']
handler.tags = ['stalk']
handler.command = /^(igstalk)$/i
handler.limit = true

module.exports = handler