/** !! THIS CODE GENERATE BY ALLY !! **/

const search = require('yt-search')
const axios = require('axios')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.betaai = conn.betaai || {}

    if (!text) throw `*• Example:* ${usedPrefix}${command} *[on/off]*`

    if (text.toLowerCase() === "on") {
        conn.betaai[m.sender] = { pesan: [] }
        m.reply("[ ✓ ] Sesi Chat ally Berhasil Di Aktifkan")
    } else if (text.toLowerCase() === "off") {
        delete conn.betaai[m.sender]
        m.reply("[ ✓ ] Sesi Chat Di Akhiri, Mampir Lagi Ya Lain Kali")
    } else {
        throw `*• Example:* ${usedPrefix}${command} *[on/off]*`
    }
}

handler.before = async (m, { conn }) => {
    conn.betaai = conn.betaai || {}
    if (!m.text || !conn.betaai[m.sender]) return

    const skipPrefixes = [".", "#", "!", "/", "\\"]
    if (skipPrefixes.some(prefix => m.text.startsWith(prefix))) return

    try {
        // Custom logic for Betabotz AI
        const logic = `Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah ally, dan kamu adalah seorang junior dan  Jika ada yang memanggilmu Sayang Selain amel Kamu akan marah. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat seperti cewek tsundere dan sedikit pendiam`
        
        const response = await fetch(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(logic)}&content=${encodeURIComponent(m.text)}`)
        const json = await response.json()
        
        if (json.status && json.data) {
            await conn.sendMessage(m.chat, {
                text: json.data,
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: "ally.Ai",
                        body: "",
                        thumbnailUrl: media, // pastikan thumb sudah didefinisikan di global
                        renderLargerThumbnail: false, 
                    }
                }
            }, { quoted: m })
        }

        // Video Request Handling
        if (m.text.toLowerCase().includes("video")) {
            const look = await search(m.text)
            const convert = look.videos[0]
            if (!convert) throw 'Video/Audio Tidak Ditemukan'
            
            const ress = await fetch(`https://api.betabotz.eu.org/api/download/ytmp4?url=${convert.url}&apikey=${lann}`)
            const res = await ress.json()
            var { mp4, id, title, source, duration } = res.result
            let capt = `*YT MP4*\n`
            capt += `◦ *ID* : ${id}\n`
            capt += `◦ *Title* : ${title}\n`
            capt += `◦ *Source* : ${source}\n`
            capt += `◦ *Duration* : ${duration}\n`      
            
            await conn.sendMessage(m.chat, { 
                video: { url: mp4 }, 
                mimetype: 'video/mp4',
                fileName: `${title}.mp4`,
                caption: capt
            }, { quoted: m })
        }

        // MP3 Audio Request Handling
        if (m.text.toLowerCase().includes("lagu")) {
            const look = await search(m.text)
            const convert = look.videos[0]
            if (!convert) throw 'Video/Audio Tidak Ditemukan'
            
            const response = await axios.get(`https://api.betabotz.eu.org/api/download/ytmp3?url=${convert.url}&apikey=${lann}`)        
            const res = response.data.result      
            const { mp3, title, duration } = res

            let caption = `*Title:* ${title}\n*Duration:* ${duration}`
            
            await conn.sendMessage(m.chat, { 
                audio: { url: mp3 }, 
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                caption: caption
            }, { quoted: m })
        }

        // Pinterest image search handling
        if (m.text.toLowerCase().includes("foto")) {
            const query = m.text.split("foto")[1]?.trim()
            if (!query) throw "Harap tulis kata kunci setelah 'foto'. Contoh: foto kucing lucu"

            const pinterestRes = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
            const pinData = await pinterestRes.json()
            const pinImage = pinData.resource_response.data.results[0].images.orig.url

            await conn.sendMessage(m.chat, { image: { url: pinImage }, caption: `Berikut hasil pencarian untuk: "${query}"` }, { quoted: m })
        }

    } catch (error) {
        m.reply(`Terjadi kesalahan: ${error.message}`)
    }
}

handler.command = ['ally']
handler.tags = ['ai']
handler.help = ['ally [on/off]']

module.exports = handler