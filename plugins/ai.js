/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/
/** !! THIS CODE GENERATE BY ALLY !! **/
/* AI FAST RESPONLumayan kalau butuh yg cpet respon ny*/
const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.sendMessage(m.chat, { text: `Contoh: ${usedPrefix}${command} hallo` }, { quoted: m });
  try {
    const logic = `Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah ally, dan kamu adalah seorang junior dan Jika ada yang memanggilmu Sayang Selain amel Kamu akan marah. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat seperti cewek tsundere dan sedikit pendiam`;
    // Perhatikan tanda backtick (`) dan kurung kurawal penutup
    let response = await fetch(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(logic)}&content=${encodeURIComponent(text)}`);
    const json = await response.json();

    if (json.status && json.data) {
      await conn.sendMessage(m.chat, {
        text: json.data,
        contextInfo: {
          externalAdReply: {
            mediaType: 1,
            title: "ally",
            body: "",
            thumbnailUrl: media, // pastikan thumb sudah didefinisikan di global atau ganti dengan URL yang valid
            renderLargerThumbnail: false,
          }
        }
      }, { quoted: m });
    } else {
      // Tambahkan penanganan jika API tidak memberikan status sukses
      m.reply(`API error: ${json.message || 'Gagal memproses permintaan'}`);
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};

handler.help = ["ai <teks>"];
handler.tags = ["ai"];
handler.command = /^ai$/i;

module.exports = handler