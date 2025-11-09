/** !! THIS CODE GENERATE BY ALLY !! **/

const { tiktok } = require('api-dylux');
let fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan URL!\n\nContoh: ${usedPrefix + command} https://tiktok.com/xxx`
  let json = await tiktok(text)
  await m.reply(status.wait)
await conn.sendFile(m.chat, json.result.music, 'tiktok.mp3', null, m, true, {
type: 'audioMessage',  
ptt: false,contextInfo: { 
forwardingScore: 99999999, 
externalAdReply: { 
body: set.footer, 
containsAutoReply: true, 
mediaType: 1, 
mediaUrl: null, 
renderLargerThumbnail: true, 
showAdAttribution: true, 
sourceId: null, 
sourceType: 'PDF', 
previewType: 'PDF', 
sourceUrl: null, 
 thumbnail: null,
 thumbnailUrl: media.thumbnail,
 title: `${json.result.author.nickname}`
}}})
}
handler.help = ['tiktokmp3'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tikaudio|tiktokmp3|ttdlmp3|ttmp3|tiktokdlmp3|gettt|tikmp3)$/i
module.exports = handler