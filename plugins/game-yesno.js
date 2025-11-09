/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let fetch = require('node-fetch')
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {
    await m.reply(status.wait)
    let res = await YesNo()
        
    try {
        await conn.sendSticker(m.chat, res.image, m, { packname: 'Bot Mengatakan...', author: res.answer })
    } catch (e) {
        throw eror
    }
}
handler.help = ["yesno"]
handler.tags = ["game"]

handler.command = /^(yesno)$/i

module.exports = handler

async function YesNo() {
    const response = await fetch(
        `https://yesno.wtf/api`
    );
    const data = await response.json();
    return data;
}