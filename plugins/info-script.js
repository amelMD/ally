/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
let own = "6282283838574@s.whatsapp.net"
conn.relayMessage(m.chat, {
    requestPaymentMessage: {
      currencyCodeIso4217: 'IDR',
      amount1000: 60000 * 1000,
      requestFrom: m.sender,
      noteMessage: {
        extendedTextMessage: {
          text: `*Halo, ini adalah Bot dirancang untuk merespon dengan cepat.*

Jika kamu membeli *Script* ini akan mendapatkan *Benefit* 
1. Free Panel 
2. Free Update (Forever - Dont Sell)
3. Free Apikey (Forever - Dont share)

Berikut Fitur - Fitur kami 
1. AI
2. DOWNLOADER
3. FUN
4. GAME
5. RPG
6. INFORMATION
7. INTERNET
8. MAKER
9. OWNER
10. QUOTES
11. STICKER
12. STALK 
13. DEPOSIT (STORE)
14. TOOLS
15. AND OTHERS

*Jika Berminat dalam pembelian Script kami bisa hubungi Owner kami kak!*
@${own.split("@")[0]}

© Rodots • 2025`,
          contextInfo: {
            mentionedJid: [own],
            externalAdReply: {
              showAdAttribution: true
            }
          }
        }
      }
    }
  }, {})
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i
handler.register = false

module.exports = handler