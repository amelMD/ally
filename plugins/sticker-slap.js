/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let fetch = require('node-fetch')
let {
    sticker
} = require('../lib/sticker.js')
//import db from '../../lib/database.js'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {

    let wait = 'Please wait...'
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @tag`

    let user = global.db.data.users[who]
    let name = await conn.getName(who)
    let name2 = m.name
    await m.reply(wait)

    let rki = await fetch(`https://api.waifu.pics/sfw/slap`)
    if (!rki.ok) throw await rki.text()
    let jkis = await rki.json()
    let {
        url
    } = jkis
    let stiker = await sticker(null, url, `(${name2}) slapped`, `${name}`)
    conn.sendFile(m.chat, stiker, null, {
        asSticker: true
    }, m)
    await m.reply('👊🏻')

}

handler.help = ['slap @tag']
handler.tags = ['sticker']
handler.command = /^(slap|bofetada)$/i
handler.limit = 100
handler.group = true

module.exports = handler