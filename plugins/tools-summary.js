/** !! THIS CODE GENERATE BY ALLY !! **/

/*
Jangan Hapus Wm Bang 

*Summary YouTube  Plugins Esm*

Ni Simple Gak Panjang Juga Mudah Di Pahami Untuk Pemula Seperti Saya

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Dev Api]*

https://whatsapp.com/channel/0029VapkSr45q08hPPPVqy26/348
*/

const axios = require('axios');

let handler = async (m, { text }) => {
  if (!text) return m.reply('Mana Url Youtube Nya?.');

  axios.get(`https://fgsi1-restapi.hf.space/api/ai/summary?url=${encodeURIComponent(text)}`)
    .then(({ data }) => m.reply(data?.status && data?.data?.summary ? `${data.data.summary}` : 'Gagal mengambil summary'))
    .catch(() => m.reply('Gagal Mendapatkan Summary'));
};

handler.help = ['summary'];
handler.command = ['summary'];
handler.tags = ['tools']

module.exports = handler;