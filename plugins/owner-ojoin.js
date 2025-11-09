/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner }) => {
    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw 'Link invalid'
    let res = await conn.groupAcceptInvite(code)
    m.reply(`Berhasil join grup`)
}
handler.help = ['ojoin <chat.whatsapp.com>']
handler.tags = ['owner']

handler.command = /^ojoin$/i
handler.rowner = true

module.exports = handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))