/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  
  let media = await q.download()
  if (!/video\/mp4/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
  try { 
  await m.reply(status.wait)
  let link = await scrap.uploader(media)
  let res = await fetchJson(`https://api.tioo.eu.org/whatmusic?url=${link.data.url}`)
  m.reply(`*🤔 WHATMUSIC 🤔*\n\n${res.result}`)
} catch(e) {
m.reply('Error')
}
}
handler.help = ['whatmusic <reply video>']
handler.tags = ['tools']
handler.command = /^(whatmusic)$/i

module.exports = handler