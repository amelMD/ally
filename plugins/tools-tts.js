/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ZHUBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

 let axios = require('axios')

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw (`*Masukkan Parameter!*\n\nExample: ${usedPrefix + command} halo, apa kabar?`);

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  try {
     let id = 'id_001'
  const { data } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
    "text": text,
    "voice": id
})
conn.sendMessage(m.chat, { audio: Buffer.from(data.data, "base64"), mimetype: "audio/mp4", ptt: true}, {quoted: m})
  } catch (e) {
    console.error(e);
    m.reply('Maaf gagal Meminta Apa Yang Kamu Mau :(');
  }
};

handler.command = handler.help = ['tts'];
handler.tags = ['tools'];

module.exports = handler;