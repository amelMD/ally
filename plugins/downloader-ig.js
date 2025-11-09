/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/* fb downloader dan ig downloader work 
Type cjs
Scraper:https://whatsapp.com/channel/0029VaDMn8D3mFYDKDGIFW2J
*/
const axios = require("axios");
const cheerio = require("cheerio");

async function fetchMedia(url) {
    try {
        const form = new URLSearchParams();
        form.append("q", url);
        form.append("vt", "home");

        const response = await axios.post("https://yt5s.io/api/ajaxSearch", form, {
            headers: {
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (response.data.status === "ok") {
            const $ = cheerio.load(response.data.data);

            if (/^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/.+/i.test(url)) {
                const thumbnailUrl = $("img").attr("src");
                const videoQualities = [];

                $("table tbody tr").each((index, element) => {
                    const quality = $(element).find(".video-quality").text().trim();
                    const downloadLink = $(element).find("a.download-link-fb").attr("href");
                    if (quality && downloadLink) {
                        videoQualities.push({ quality, downloadLink });
                    }
                });

                return { thumbnailUrl, videoQualities };
            } else if (/^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel)\/.+/i.test(url)) {
                const videoUrl = $('a[title="Download Video"]').attr("href");
                const thumbnailUrl = $("img").attr("src");

                if (!videoUrl || !thumbnailUrl) throw new Error("Video atau thumbnail tidak ditemukan.");

                return { thumbnailUrl, videoUrl };
            } else {
                throw new Error("URL tidak valid. Masukkan link Facebook atau Instagram.");
            }
        } else {
            throw new Error("Gagal mengambil video: " + response.data.message);
        }
    } catch (error) {
        throw error;
    }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `Gunakan format: ${usedPrefix + command} <URL>`, m);

    conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    try {
        let media = await fetchMedia(text);
        if (!media) return conn.reply(m.chat, "Gagal mengambil media. Pastikan link benar.", m);

        if (media.videoQualities) {
            let bestQuality = media.videoQualities[0];
            await conn.sendMessage(m.chat, { video: { url: bestQuality.downloadLink }, mimetype: "video/mp4", caption: `📥 *Facebook Downloader*\n🔗 *Sumber:* ${text}` }, { quoted: m });
        } else if (media.videoUrl) {
            await conn.sendMessage(m.chat, { video: { url: media.videoUrl }, mimetype: "video/mp4", caption: `📥 *Instagram Downloader*\n🔗 *Sumber:* ${text}` }, { quoted: m });
        } else {
            await conn.sendFile(m.chat, media.thumbnailUrl, "thumbnail.jpg", `🔗 *Sumber:* ${text}`, m);
        }
    } catch (error) {
        conn.reply(m.chat, "Terjadi kesalahan, coba lagi.", m);
    }
};

handler.help = ["downloader"];
handler.command = ["ig", "instragram","igdl"];
handler.limit = true;

module.exports = handler;