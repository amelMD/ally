/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Silahkan masukkan requestmu', m)
    conn.fakeReply('120363220255082078@g.us', `${text}`, m.sender, m.text, m.chat)
    conn.reply(m.chat, '_Berhasil Request Fitur ke Owner Bot_', m)
}
handler.help = ['aswm']
handler.tags = ['main']
handler.command = /^asw(m?)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler