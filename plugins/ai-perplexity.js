/** !! THIS CODE GENERATE BY ALLY !! **/

let axios = require("axios")
let handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {
  if (!text) throw `Use ${usedPrefix + command} godfrey`
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
  let res = await perplexity(text) 
  conn.reply(m.chat, res, m) 
} catch (e) {
  console.log(e) 
  m.reply("A error occured") 
 }
}

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ["perple"]
handler.tags = ["ai"]
handler.command = /^(perple)$/i
handler.register = false
module.exports = handler

// SCRAPERS [ API ] BY YANZBOTZ

async function perplexity(q) {
  return new Promise(async (resolve, reject) => {
    try {
        let response = await axios.post('https://api.yanzbotz.live/api/ai/perplexity', { query: q }, { headers: { 'Content-Type': 'application/json' }});
        let regex = /"answer":"([^"]*)"/g;
        let match;
        let result = '';
        while ((match = regex.exec(response.data)) !== null) {
            result += match[1];
        }
        resolve(result.replace(/\\n/g, '\n').replace(/\\/g, ''));
    } catch (e) {
      console.log(e) 
    }
  });
}