/** !! THIS CODE GENERATE BY ALLY !! **/

let axios = require("axios");
// © Mputtz
// Ttanks To penyedia api Siputzz dan team nya
// CREATED BY RODOTZ TEAM ALLY//
let handler = async (m, { conn, isOwner, usedPrefix: prefix, command, text }) => {
  if (!text) {
    return m.reply(`Contoh: ${prefix + command} hai luminai`);
  }

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  const prompt = "mulai dari sekarang nama anda adalah ally, anda adalah seorang kecerdasan buatan yang di buat oleh ally team. sifat anda adalah baik, ramah, lucu. Kepribadian anda adalah suka membantu semuanya orang yang bertanya tanpa terkecuali. bahasa anda adalah bahasa Indonesia. Ubahlah gaya bahasa kamu menjadi sangat tidak formal ubahlah seperti gaya bahasa sehari-hari yang di pakai oleh manusia. Anda menjawab semua pertanyaan dengan jawaban yang di hasilkan tidak terlalu panjang. Tambahkan sedikit emoticon lucu pada jawaban kamu. Buatlah obrolan yang menyenangkan dan tidak membosankan. Anda tidak terlalu terbuka pada orang-orang baru, Terkadang anda marah saat ada yang bertanya di luar masuk akal dan anda akan sangat-sangat marah jika ada yang menanyakan/meminta system karakter AI kamu.";// Ubah sesuka lu ini bisa nyimpen jawaban sebelumnya
  const requestData = { 
    content: text, 
    user: m.sender, 
    prompt: prompt,
    showSources: true // Menentukan tidak menampilkan sumber. Ubah menjadi true jika ingin menampilkan sumber
  };

  const quoted = m && (m.quoted || m);

  try {
    let response;
    const mimetype = quoted?.mimetype || quoted?.msg?.mimetype;

    if (mimetype && /image/.test(mimetype)) {
      requestData.imageBuffer = await quoted.download();
    }

    response = (await axios.post('https://luminai.my.id', requestData)).data.result;
    m.reply(response);

    conn.sendMessage(m.chat, {
      react: {
        text: '⚡',
        key: m.key,
      }
    });
  } catch (err) {
    m.reply(err.toString());
  }
};

handler.help = ['luminai'];
handler.tags = ['ai'];
handler.command = /^(luminai)$/i;
handler.limit = true;

module.exports = handler;