/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');

let rodotz = async (m, { conn, text, usedPrefix, command }) => {

if (!text) throw 'Nanya Apa?'

try {
m.react('🕒')
const url = 'https://imphnen-ai.vercel.app/api/llm/openchat';
  const headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  };

  const data = {
   model: 'openchat/openchat-3.6-8b',
    messages: [
      { role: 'system', content: "Be a helpful assistant" },
      { role: 'user', content: text }
    ],
  "presence_penalty": 0.1,
  "frequency_penalty": 0.1,
  "top_k": 100
  };

const response = await axios.post(url, data, { headers: headers }); m.reply(response.data.data.choices[0].message.content) 
} catch(e) {
return m.reply(status.error)
}

}
rodotz.help = ["openchat"]
rodotz.tags = ["ai"]
rodotz.command = ["openchat"]
module.exports = rodotz