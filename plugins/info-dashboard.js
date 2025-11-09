/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

var handler = async (m, {
 conn
 }) => {
  var stats = Object.entries(db.data.stats).map(([key, val]) => {
    var name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  var handlers = stats.slice(0, 100).map(({
   name, 
   total, 
   last
 }) => {
    return `• *Command* : ${name}\n↻ *Global HIT* : ${total}`
  }).join`\n\n`
 conn.sendMessage(m.chat, {
text: handlers,
contextInfo: {
externalAdReply: {
title: `${set.name}`,
body: layout.xl + " Info Dashboard",
thumbnailUrl: media.thumbnail,
sourceUrl: "",
mediaType: 1,
renderLargerThumbnail: true
}}})
};
handler.help = ['dashboard']
handler.tags = ['info']
handler.command = /^dash(board)?$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}