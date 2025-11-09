/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let fetch = require('node-fetch')

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/renungan.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  await conn.sendFile(m.chat, json, "", "", m)
}
handler.command = handler.help = ['renungan']
handler.tags = ['quotes']
handler.limit = true

module.exports = handler