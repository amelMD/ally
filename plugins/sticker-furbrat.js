/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const { Sticker } = require('wa-sticker-formatter');

const brat = async (text) => {
  try {
    return await new Promise((resolve, reject) => {
      if (!text) return reject("Missing text input");
      const random = Math.floor(Math.random() * 7);
      const API = `https://fastrestapis.fasturl.link/tool/furbrat?text=${text}&style=${random}&mode=center`;
      axios
        .get(API, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          const image = Buffer.from(res.data);
          if (image.length <= 10240) return reject("Failed to generate brat");
          return resolve({ success: true, image });
        })
        .catch((e) => reject(e));
    });
  } catch (e) {
    return { success: false, errors: e };
  }
};

const cooldown = new Map();

let handler = async (m, { conn, text, usedPrefix }) => {
  const user = m.sender;
  const cooldownTime = 10000; // 10 detik
  const maxAttempts = 3;

  const quo = text || m.quoted?.text || m.quoted?.caption || null;
  if (!quo) return m.reply(`Gunakan perintah ini dengan format: ${usedPrefix}furbrat <teks>`);

  if (cooldown.has(user)) {
    const lastTime = cooldown.get(user);
    const elapsed = (Date.now() - lastTime) / 1000;

    if (elapsed < cooldownTime / 1000) {
      const attempts = global.db.data.users[user]?.attempts || 0;
      global.db.data.users[user] = { ...(global.db.data.users[user] || {}), attempts: attempts + 1 };

      if (global.db.data.users[user].attempts >= maxAttempts) {
        global.db.data.users[user].banned = true;
        return m.reply("[❗] Anda telah dibanned karena spam!");
      }

      return m.reply(`[❗] Tunggu ${Math.ceil(cooldownTime / 1000 - elapsed)} detik sebelum menggunakan perintah ini lagi.\n\n[ note ]\nJika Anda spam fitur ini 3x dalam masa cooldown, maka Anda akan dibanned dari bot!`);
    }
  }

  cooldown.set(user, Date.now());
  if (global.db.data.users[user]?.attempts) global.db.data.users[user].attempts = 0;

  try {
    conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    const result = await brat(quo);
    if (!result.success) throw "Gagal membuat stiker brat";

    const sticker = new Sticker(result.image, {
      pack: 'Stiker By',
      author: 'Ally - MultiDevice',
      type: 'image/png',
    });
    const stikerBuffer = await sticker.toBuffer();
    await conn.sendMessage(m.chat, { sticker: stikerBuffer }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    await conn.reply(m.chat, 'Maaf, terjadi kesalahan saat mencoba membuat stiker brat. Coba lagi nanti.', m);
  }
};

handler.help = ['furbrat'];
handler.tags = ['sticker'];
handler.command = /^furbrat$/i;
handler.limit = 3;

module.exports = handler;