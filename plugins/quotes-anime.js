/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  let res = await (await fetch('https://katanime.vercel.app/api/getrandom?limit=1'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if(!json.result[0]) throw json
  let { indo, character, anime } = json.result[0]
  conn.reply(m.chat, `${indo}\n\n~ Character:\n${character}\n~Anime:\n${anime}`, m)
}
handler.help = ['quotesanime']
handler.tags = ['anime', 'quotes']
handler.command = /^(quotesanime|kataanime)$/i
module.exports = handler