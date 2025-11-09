/** !! THIS CODE GENERATE BY ALLY !! **/

const yts = require('yt-search');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Apa yang ingin kamu cari?\nContoh: .yts dj mashup';
  }

  // Kirim pesan menunggu
  await conn.reply(m.chat, 'Mencari, harap tunggu sebentar...', m);

  try {
    // Melakukan pencarian dengan yt-search
    const results = await yts(text);

    if (!results || !results.all.length) {
      throw 'Tidak ada hasil ditemukan. Coba gunakan kata kunci yang berbeda.';
    }

    // Memformat hasil pencarian
    const resultList = results.all.map((v, i) => {
      return `${i + 1}. *${v.title}*\n⏱️ Durasi: ${v.timestamp}\n👀 Views: ${v.views}\n🔗 [Tonton]( ${v.url} )`;
    }).slice(0, 10); // Batasi hingga 10 hasil teratas

    // Kirim daftar hasil
    await conn.reply(
      m.chat,
      `乂  *YouTube Search*\n\nHasil pencarian untuk: *${text}*\n\n${resultList.join('\n\n')}`,
      m
    );
  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, 'Terjadi kesalahan saat mencari. Silakan coba lagi nanti.', m);
  }
};

handler.help = ['yts <query>', 'ytsearch <query>'];
handler.tags = ['search', 'downloader'];
handler.command = ['yts', 'ytsearch'];
handler.limit = true;
handler.register = false;

module.exports = handler;