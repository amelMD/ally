/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, usedPrefix, command }) => {
    const notStickerMessage = `Reply / Balas pesan stickernya?\n\n*${usedPrefix + command}*`
    if (!m.quoted) throw notStickerMessage
    const q = m.quoted || m
    let mime = q.mediaType || ''
    if (/webp/.test(mime)) throw notStickerMessage
    let media = await q.download()
    await conn.sendMessage(m.chat, {image: media, caption: set.footer}, {quoted: m})
}
handler.help = ['toimg <sticker>']
handler.tags = ['sticker']
handler.command = /^(toimg)$/i

module.exports = handler