/** !! THIS CODE GENERATE BY ALLY !! **/

let jimp = require("jimp")
let uploadImage = require("../lib/uploadImage.js")
let uploadFile = require("../lib/uploadFile.js")

let handler = async (m, { conn, usedPrefix }) => {
	
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw "Balas medianya"

let media = await q.download()
let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isMedia ? uploadImage : uploadImage)(media)

let source = await jimp.read(await link)
let height = await source.getHeight()
let width = await source.getWidth()

m.reply(`▢ _*RESOLUSI :*_ ${width} x ${height}

◦ Lebar : ${width}
◦ Tinggi : ${height}

◦ Tautan : ${link}`)
}
handler.help = ['cekresolusi']
handler.tags = ['tools']
handler.command = /^(cekreso(lusi)?)$/i

module.exports = handler