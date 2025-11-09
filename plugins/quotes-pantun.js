/** !! THIS CODE GENERATE BY ALLY !! **/

let axios = require('axios')
let handler = async (m) => {
    let url = await axios.get('https://raw.githubusercontent.com/IdkJhus/JhuszBotV1/main/node_modules/ra-api/lib/database/pantun.json')
    let data = pickRandom(url.data)
    m.reply(data.trim())
}
handler.help = ['pantun']
handler.tags = ['quotes']
handler.command = /^(pantun)$/i

module.exports = handler

function pickRandom(list) { 
return list[Math.floor(list.length * Math.random())]
}