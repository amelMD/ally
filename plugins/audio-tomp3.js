/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let { toAudio } = require('../lib/converter.js')

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q || q.msg).mimetype || q.mediaType || ''
    if (!/video|audio/.test(mime)) throw `🚀 Reply video/audio with caption *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'can\'t download media'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'can\'t convert media to audio'
    await conn.sendFile(m.chat, audio.data, `Convert by ${set.name}.mp3`, '', m, /vn/.test(command) ? true : false, /mp3/.test(command) ? { asDocument: true } : {}, true)
}
handler.help = ['tomp3'].map(v => v + '<media>')
handler.tags = ['audio']
handler.command = /^to(mp3|a(udio)?)$/i
handler.limit = true

module.exports = handler