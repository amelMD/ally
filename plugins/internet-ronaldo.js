/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
let handler = async(m, { conn, usedPrefix, command }) => {
let cristiano = (await axios.get(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/CristianoRonaldo.json`)).data  
let ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())]
conn.sendFile(m.chat, ronaldo, 'error.jpg', `*siuuuuuuuuuu*`, m)}

handler.help = ['cristianoronaldo', 'cr7']
handler.tags = ['internet']
handler.command = /^(ronaldo|cr7)$/i
module.exports = handler