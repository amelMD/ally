/** !! THIS CODE GENERATE BY ALLY !! **/

let { sticker } = require('../lib/sticker.js')
let fetch = require('node-fetch')
let { MessageType } = require('@whiskeysockets/baileys')

let handler = async(m, { conn }) => {
  let name = await conn.getName(m.sender)
  let res = await `https://api.memegen.link/images/custom/ngetik_yg_benar/dikit_lu_${name}.jpg?background=https://telegra.ph/file/f918fd49b0d7ded912854.png&watermark=memecomplete.com&token=khj7yfpkw8idaztccuys`
  let stiker = await sticker(null, res, global.packname, global.author)
  conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, false, { asSticker: true })
}
handler.customPrefix = /^(p|ngocok|coli|hai|ahh)$/i
handler.command = new RegExp

module.exports = handler