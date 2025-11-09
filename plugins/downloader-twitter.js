/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
/*
SCRAPER BY INS
*/
async function Twitter(url) {
    const form = new FormData();
    form.append("q", url);
    form.append("lang", "id");

    const result = {
        status: 200,
        result: {}
    };

    try {
        const response = await axios("https://x2twitter.com/api/ajaxSearch", {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://x2twitter.com",
                "Referer": "https://x2twitter.com/id",
                "User-Agent": "GoogleBot",
            },
            data: form,
        });

        const $ = cheerio.load(response.data.data);
        const $$ = $(".tw-right > .dl-action");
        const _$ = $(".tw-middle > .content > .clearfix");

        result.result = {
            title: _$.find("h3").text(),
            duration: _$.find("p").text() + " Seconds",
            thumb: $(".tw-video > .tw-left > .thumbnail > .image-tw.open-popup > img").attr("src"),
            video: {
                fhd: $$.find("p").eq(0).find("a").attr("href"),
                hd: $$.find("p").eq(1).find("a").attr("href"),
                sd: $$.find("p").eq(2).find("a").attr("href"),
                sd2: $$.find("p").eq(3).find("a").attr("href"),
                audio: $$.find("p").eq(4).find("a").attr("data-audiourl"),
                image: $$.find("p").eq(5).find("a").attr("href"),
            },
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            msg: "Something Error :/"
        };
    }

    return result;
}
/*
THIS CODE BY PUTRAMODZ
*/
let Amelia = async (m, { conn, text, command }) => {
    if (
        !text ||
        (!text.startsWith('https://twitter.com/') && !text.startsWith('https://x.com/'))
    ) {
        return conn.reply(
            m.chat,
            `Gunakan perintah dengan format berikut:\n\n*${command} <link Twitter/X>*\n\nContoh:\n${command} https://x.com/example/status/12345`,
            m
        );
    }
    m.react("🔰")

    try {
        const media = await Twitter(text);

        if (media.status !== 200) {
            throw new Error("Tidak dapat mengunduh media.");
        }

        const { result } = media;
        if (result.video.image && !result.video.fhd && !result.video.hd && !result.video.sd) {
            await conn.sendFile(
                m.chat,
                result.video.image,
                'image.jpg',
                `*Gambar*\nJudul: ${result.title}\nDurasi: ${result.duration}`,
                m
            );
        }
        else if (result.video.fhd || result.video.hd || result.video.sd) {
            for (const quality in result.video) {
                if (result.video[quality] && quality !== "image" && quality !== "audio") {
                    await conn.sendFile(
                        m.chat,
                        result.video[quality],
                        `${quality}.mp4`,
                        `*Video*\nJudul: ${result.title}\nKualitas: ${quality.toUpperCase()}`,
                        m
                    );
                    break
                }
            }
        } else {
            throw new Error("Media tidak ditemukan.");
        }
    } catch (error) {
        await conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
    }
};

Amelia.help = ["twitter <link>"];
Amelia.tags = ["downloader"];
Amelia.command = ["twitter", "twdl", "twdownload", "x", "xdl"];
Amelia.limit = true;

module.exports = Amelia;