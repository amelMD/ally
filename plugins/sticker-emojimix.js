/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

let fetch = require('node-fetch')
let { sticker } = require('../lib/sticker.js')
let fs = require('fs')

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let [emoji1, emoji2] = text.split`+`
  if (!emoji1 || !emoji2) throw `*Masukan 2 Emoji*\n\n*Contoh:*\n- ${usedPrefix + command} 🥰+😍\n\n*Note:* Jangan lupa menggunakan ini > "+"`
  m.react('🕒')
  const anu = await (await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)).json()
  if (anu.results[0] == undefined) throw 'Kombinasi Emoji Tidak Ditemukan'
  let emix = anu.results[0].media_formats.png_transparent.url
  let stiker = await sticker(false, emix, set.packname, set.author)
  conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
}

handler.help = ['emojimix']
handler.tags = ['sticker']
handler.command = /^(emojimix|emix)$/i
handler.limit = true
handler.group = false

module.exports = handler