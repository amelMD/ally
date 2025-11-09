/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let fetch = require('node-fetch')
let handler = async(m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let url = await conn.profilePictureUrl(who, 'image')
    await conn.sendFile(m.chat, url, 'profile.jpg', `@${who.split`@`[0]}`, m, null, { mentions: [who]})
}
handler.command = /^(get(pp|profile))$/i
handler.help = ['getprofile <@user>']
handler.tags = ['fun']
handler.limit = true

module.exports = handler