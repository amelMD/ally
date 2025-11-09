/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, text, participants, isAdmin, isOwner }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`${text ? `${text}\n\n` : 'No Message\n\n'}Tag All\n` + users.map(v => '@' + v.replace(/@.+/, '')).join`\n` + '', null, {
        mentions: users
    })
}
handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = 1
handler.group = 1
handler.botAdmin = false
module.exports = handler