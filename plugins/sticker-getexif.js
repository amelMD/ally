/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

let webp = require('node-webpmux')
let util = require('util')

let handler = async (m) => {
    if (!m.quoted) return m.reply('Tag stikernya!')
    let q = { message: { [m.quoted.mtype]: m.quoted } }
    if (/sticker/.test(m.quoted.mtype)) {
        let img = new webp.Image()
        await img.load(await m.quoted.download())
try { 
m.reply(util.format(JSON.parse(img.exif.slice(22).toString())))
} catch (e) {
console.log(e)
return m.reply('Tidak diketahui')
}
    }
}
handler.help = ['getexif <reply sticker>']
handler.tags = ['sticker']

handler.command = ['getexif']
handler.limit = false

module.exports = handler