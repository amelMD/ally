/** !! THIS CODE GENERATE BY ALLY !! **/

let fetch = require('node-fetch');
let { sticker } = require('../lib/sticker.js'); // Pastikan ada fungsi `sticker` di library ini

let handler = async (m, { conn }) => {
  try {
    // Ambil data dari JSON
    let response = await fetch('https://www.biolink.fun/dadu/dadu.json');
    if (!response.ok) throw new Error('Gagal mengambil data dadu');
    
    let { dice } = await response.json();
    let randomDice = dice[Math.floor(Math.random() * dice.length)];
    
    // Ambil gambar dadu
    let res = await fetch(randomDice.image);
    if (!res.ok) throw new Error('Gagal mengambil gambar dadu');
    
    let buffer = await res.buffer();
    
    // Konversi gambar ke stiker
    const stiker = await sticker(buffer, false, global.stickpack, global.stickauth);
    if (stiker) {
      return conn.sendFile(m.chat, stiker, `dadu${randomDice.number}.webp`, '', m);
    } else {
      throw new Error('Gagal membuat stiker');
    }
  } catch (e) {
    m.reply('Terjadi kesalahan, coba lagi nanti.');
    console.error(e);
  }
};

handler.help = ['dadu'];
handler.tags = ['game'];
handler.command = ['dadu'];

module.exports = handler