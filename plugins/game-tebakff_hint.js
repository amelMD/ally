/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn }) => {
    conn.tbkepep = conn.tbkepep ? conn.tbkepep : {}
    let id = 'tebakepep-' + m.chat
    if (!(id in conn.tbkepep)) throw false
    let json = conn.tbkepep[id][1]
    m.reply('Clue : ' + '```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```' + '\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_')
}
handler.command = /^hep$/i
handler.limit = true
module.exports = handler