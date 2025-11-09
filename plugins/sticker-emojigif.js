/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require("axios");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `[❗] *Penggunaan:* ${usedPrefix + command} <emoji>\n\nContoh: ${usedPrefix + command} 😁`;

    conn.sendMessage(m.chat, { react: { text: '🎨', key: m.key } });

    try {
        const emoji = encodeURIComponent(text.trim());
        const apiUrl = `https://anabot.my.id/api/maker/emojiGif?emoji=${emoji}&apikey=${api.ana}`;

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        await conn.sendMessage(m.chat, { 
            sticker: { url: apiUrl }, 
            mimetype: 'image/webp' 
        }, { quoted: m });
    } catch (error) {
        console.error('Error:', error);
        conn.reply(m.chat, '[❗] Terjadi kesalahan saat memproses emoji. Pastikan emoji valid atau coba lagi nanti.', m);
    }
};

handler.help = ['emojisticker <emoji>'];
handler.tags = ['maker'];
handler.command = /^(emojisticker|emojigif)$/i;

module.exports = handler;