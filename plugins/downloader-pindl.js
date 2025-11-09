/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukkan URL Pinterest\n\nContoh:\n${usedPrefix + command} https://id.pinterest.com/pin/862439397377053654`);

    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/pinterest?url=${encodeURIComponent(text)}`);

        if (!data.status || !data.data || !data.data.url) throw 'Gagal mendapatkan media dari Pinterest.';

        const mediaUrl = data.data.url;

        if (mediaUrl.endsWith('.mp4')) {
            conn.sendMessage(m.chat, {
                video: { url: mediaUrl },
                caption: `Berhasil diunduh dari Pinterest\nSource: ${text}`
            }, { quoted: m });
        } else {
            conn.sendMessage(m.chat, {
                image: { url: mediaUrl },
                caption: `Berhasil diunduh dari Pinterest\nSource: ${text}`
            }, { quoted: m });
        }
    } catch (e) {
        return m.reply(`Tidak bisa diunduh, silakan coba lagi.\n\nError: ${e.message}`);
    }
};

handler.help = ['pindl <url>'];
handler.tags = ['downloader'];
handler.command = /^pindl$/i;
handler.limit = true

module.exports = handler;