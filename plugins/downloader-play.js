/** !! THIS CODE GENERATE BY ALLY !! **/

const ytdl = require('@vreden/youtube_scraper');
const yts = require('yt-search');

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply("Contoh: !play dj tiktok");

    await conn.sendMessage(m.chat, { react: { text: '🔎', key: m.key } });

    let search = await yts(text);
    if (!search.all.length) return m.reply("Error! Hasil tidak ditemukan.");

    let { url, thumbnail, title, author, timestamp } = search.all[0];

    let ytdlResult;
    try {
        // Mencoba memanggil ytmp3 dan menangkap hasilnya
        ytdlResult = await ytdl.ytmp3(url);
    } catch (e) {
        // Menangani error jika ytdl.ytmp3 melempar exception
        console.error("Error saat memanggil ytdl.ytmp3:", e);
        return m.reply("Terjadi kesalahan saat mencoba mengunduh audio. Silakan coba lagi nanti.");
    }

    // Mendestrukturisasi dengan aman. Jika ytdlResult null/undefined, gunakan objek kosong.
    let { status, download } = ytdlResult || {};

    if (!status) {
        // Jika status false atau undefined (karena ytdlResult null/undefined/tidak punya status)
        return m.reply("Error! Tidak dapat mengunduh audio atau format respons tidak valid.");
    }

    // Memastikan objek download dan properti url-nya ada sebelum digunakan
    if (!download || !download.url) {
        return m.reply("Error! Audio berhasil diunduh, tetapi URL unduhan tidak ditemukan.");
    }

    await conn.sendMessage(m.chat, {
        audio: { url: download.url },
        mimetype: "audio/mpeg",
        contextInfo: {
            externalAdReply: {
                thumbnailUrl: thumbnail,
                title,
                body: `Author: ${author.name} || Duration: ${timestamp}`,
                sourceUrl: url,
                renderLargerThumbnail: true,
                mediaType: 1
            }
        }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
};

handler.command = /^(play)$/i;
handler.tags = ["downloader"];
handler.limit = true;
handler.help = ["play"]
module.exports = handler;