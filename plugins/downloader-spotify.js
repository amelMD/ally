/** !! THIS CODE GENERATE BY ALLY !! **/

const { searching, spotifydl } = require("../lib/spotify");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `[❗] *Penggunaan:* ${usedPrefix + command} <search>`;
    
    conn.spotifysearch = conn.spotifysearch || {};
    conn.sendMessage(m.chat, { react: { text: '🎧', key: m.key } });

    let results = await searching(text);
    if (!results || results.data.length === 0) throw 'Lagu tidak ditemukan';

    let responseText = '[❗] Balas pesan ini dengan nomor untuk mendapatkan lagunya.\n\n';
    results.data.forEach((item, index) => {
        const title = item.title || "Unknown Title";
        const artistName = item.artist?.name || "Unknown Artist";
        const popularity = item.popularity || "N/A";
        const url = item.url || "No URL";

        responseText += `*${index + 1}.* ${title} - ${artistName}\n∘ Popularity: ${popularity}\n∘ Link: ${url}\n\n`;
    });

    const { key } = await conn.reply(m.chat, responseText, m);
    conn.spotifysearch[m.sender] = { results: results.data, key };

    handler.before = async (m, { conn }) => {
        if (!conn.spotifysearch[m.sender]) return;

        const { results, key } = conn.spotifysearch[m.sender];
        if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

        const choice = Number(m.text.trim());
        if (isNaN(choice) || choice < 1 || choice > results.length) {
            return conn.reply(m.chat, "[❗] Nomor urut tidak valid. Pilih nomor yang sesuai dengan daftar.", m);
        }

        const selectedTrack = results[choice - 1];
        conn.sendMessage(m.chat, { delete: key });
        delete conn.spotifysearch[m.sender];

        try {
            let music = await spotifydl(selectedTrack.url);

            let caption = `∘ Title: ${selectedTrack.title || "Unknown Title"}\n∘ Artist: ${selectedTrack.artist?.name || "Unknown Artist"}\n∘ Popularity: ${selectedTrack.popularity || "N/A"}\n∘ Link: ${selectedTrack.url || "No URL"}`;

            await conn.sendFile(m.chat, music.download, `${selectedTrack.title || "Unknown Title"}.mp3`, caption, m, true);
        } catch (error) {
            console.error('Error:', error);
            conn.reply(m.chat, 'Terjadi kesalahan saat mengunduh lagu. Coba lagi.', m);
        }
    };
};

handler.help = ['spotify <pencarian>'];
handler.tags = ['downloader'];
handler.command = /^(spotify)$/i;
handler.limit = true;

module.exports = handler;