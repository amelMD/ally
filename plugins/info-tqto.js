/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, usedPrefix }) => {
let owner = '6282179160880@s.whatsapp.net'
let owner1 = '6283846016963@s.whatsapp.net'
let owner2 = '6283863727400@s.whatsapp.net'
let radit = `@${owner.split("@")[0]}`
let zals = `@${owner1.split("@")[0]}`
let putra = `@${owner2.split("@")[0]}`
let txt = `${layout.xl}  *I N F O  -  S C R I P T*

    ◦  *Name* : AllyBot Multi Device
    ◦  *Visitor* : 0
    ◦  *Size* : 6,00 MB
    ◦  *Created At* : 25/11/23 - 00:11:27
    ◦  *Url* : github.com/JackGG12345
    ◦  *Base* : github.com/dann-md
    
    0 Forks · 0 Stars · 0 Issues
  

乂 *B I G - T H A N K S T O*

    ◦  _*PutraModz*_ ( _${putra}_ )
    ◦  _*Radit*_ ( _${radit}_ )
    ◦  _*Zal's*_ ( _${zals}_ )

${set.footer}`
conn.sendMessage(m.chat, {
text: txt,
contextInfo: {
mentionedJid: [owner2 ,owner1, owner],
externalAdReply: {
title: null,
thumbnailUrl: media.thumbnail,
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: m})
}
handler.tags = ["info"]
handler.command = /^(tqto)$/i

module.exports = handler