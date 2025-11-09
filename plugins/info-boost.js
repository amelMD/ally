/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

let { performance } = require('perf_hooks')

let handler = async (m, { conn }) => {

 let start = `Waiting is being accelerated...`
   let old = performance.now()
   let neww = performance.now()
   let speed = `${neww - old}`
   let finish = `🚩 *Bot succeeded in Accelerate!*\n\n*_Speed: ${speed} Second!_*`

     const arr = [
    { text: "[▒▒▒▒▒▒▒▒▒▒]", timeout: 100 },
    { text: "[█▒▒▒▒▒▒▒▒▒]", timeout: 100 },
    { text: "[██▒▒▒▒▒▒▒▒]", timeout: 100 },
    { text: "[███▒▒▒▒▒▒▒]", timeout: 100 },
    { text: "[████▒▒▒▒▒▒]", timeout: 100 },
    { text: "[█████▒▒▒▒▒]", timeout: 100 },
    { text: "[██████▒▒▒▒]", timeout: 100 },
    { text: "[███████▒▒▒]", timeout: 100 },
    { text: "[████████▒▒]", timeout: 100 },
    { text: "[█████████▒]", timeout: 100 },
    { text: "[██████████]", timeout: 100 },
    { text: `${finish}`, timeout: 100 }
  ];

  const lll = await conn.sendMessage(m.chat, { text: start }, { quoted: m });

  for (let i = 0; i < arr.length; i++) {
    await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: lll,
        type: 14,
        editedMessage: {
          conversation: arr[i].text
        }
      }
    }, {});
  }
}
handler.help = ['boost', 'refresh']
handler.tags = ['info']
handler.command = /^boost|refresh/i

handler.rowner = true 


handler.fail = null
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}