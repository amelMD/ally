/** !! THIS CODE GENERATE BY ALLY !! **/

/*bing copilot bisa create image type cjs tqto api siputzx
*/
const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const userInput = text.trim();
  if (!userInput) throw `Tolong masukkan teks setelah perintah ${usedPrefix + command}`;

  m.react("🤖")

  try {
    const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/copilot?text=${encodeURIComponent(userInput)}`);

    if (!data || !data.status) {
      throw new Error('Tidak ada respons dari API. Silakan coba lagi nanti.');
    }

    const responseText = data.data.text;
    const imageGenerated = data.data.imageGenerated;

    let replyMessage = `🤖 *Bing Copilot*: ${responseText}`;

    if (imageGenerated && imageGenerated.url) {
      await conn.sendMessage(m.chat, {
        image: { url: imageGenerated.url },
        caption: replyMessage
      }, { quoted: m });
    } else {
      m.reply(replyMessage);
    }
  } catch (e) {
    console.error('Error:', e);
    m.reply('Terjadi kesalahan saat memproses permintaan: ' + e.message);
  }
};

handler.help = ['copilot'];
handler.tags = ['tools'];
handler.command = /^(copilot)$/i;
handler.limit = true;
handler.register = false;

module.exports = handler;