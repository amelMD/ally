/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const  cheerio = require('cheerio');

async function loveTik(url) {
    const res = await axios.post(
        "https://lovetik.app/api/ajaxSearch",
        new URLSearchParams({ q: url, lang: "id" }),
        {
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest",
                accept: "*/*"
            }
        }
    )
    if (!res.data || res.data.status !== "ok") throw new Error("No data found")
    const $ = cheerio.load(res.data.data)
    const title = $("h3").text().trim()
    const thumbnail = $(".image-tik img").attr("src") || null
    const duration = $("p").first().text().trim() || null
    const hd = $('a:contains("Unduh MP4 HD")').attr("href") || null
    const mp3 = $('a:contains("Unduh MP3")').attr("href") || null
    const images = []
    $(".photo-list .download-items__btn a").each((_, el) => {
        const img = $(el).attr("href")
        if (img) images.push(img)
    })
    return {
        status: 200,
        type: images.length > 0 ? "image" : "video",
        title,
        duration,
        thumbnail,
        hd: images.length > 0 ? null : hd,
        mp3: images.length > 0 ? null : mp3,
        images: images.length > 0 ? images : null
    }
}

let handler = async (m, { conn, args }) => {
    try {
        if (!args[0]) return m.reply("*Example :* .douyin https://www.iesdouyin.com/share/video/7548588476507409705/")
        const data = await loveTik(args[0])

        if (data.thumbnail) {
            const mediaType = data.type === "image" ? "Image" : "Video"
            const caption = `°${data.title}\n\n> Send ${mediaType}`
            await conn.sendMessage(m.chat, { image: { url: data.thumbnail }, caption }, { quoted: m })
        }

        if (data.type === "image" && data.images?.length) {
            for (const img of data.images) {
                await conn.sendMessage(m.chat, { image: { url: img } }, { quoted: m })
            }
        }

        if (data.type === "video" && data.hd) {
            await conn.sendMessage(m.chat, { video: { url: data.hd } }, { quoted: m })
        }

        if (data.mp3) {
            await conn.sendMessage(m.chat, { audio: { url: data.mp3 }, mimetype: "audio/mpeg" }, { quoted: m })
        }

    } catch (e) {
        m.reply(e.message)
    }
}

handler.help = ["douyin"]
handler.command = ["douyin"]
handler.tags = ["downloader"]

module.exports = handler