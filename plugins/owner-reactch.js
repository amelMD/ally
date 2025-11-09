/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let args = text.split(" ");
  if (args.length < 3) {
    return m.reply(
      `⚠ Gunakan format: *${usedPrefix + command} <id_channel> <id_pesan> <emoji>*\n\n_Contoh:_\n*${usedPrefix + command} 999733883@newsletter 3505 🤭*`
    );
  }

  let id_channel = args[0];
  let id_pesan = args[1];
  let emoji = args.slice(2).join(" "); // Mendukung lebih dari satu emoji

  try {
    await conn.newsletterReactMessage(id_channel, id_pesan, emoji);
    m.reply(
      `✅ *Berhasil menambahkan reaksi!* \n\n📌 *ID Channel:* ${id_channel}\n🆔 *ID Pesan:* ${id_pesan}\n😆 *Emoji:* ${emoji}`
    );
  } catch (err) {
    console.error(err);
    m.reply(
      "❌ Gagal menambahkan reaksi ke pesan channel. Pastikan ID channel, ID pesan, dan emoji benar."
    );
  }
};

handler.help = ["reactchannel"];
handler.tags = ["channel"];
handler.command = ["reactchannel", "reactch"];
handler.rowner = true;

module.exports = handler;