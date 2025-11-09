/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

const uploadImage = require("../lib/uploadFile");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

// Inisialisasi Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyBGxD_X1igKoxWfbTnH3YDnXGJXvyxgjzw');
const modelPro = genAI.getGenerativeModel({ model: 'gemini-pro' });
const modelVision = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command,
    text
}) => {
    if (!text) return m.reply(`*Example:* ${usedPrefix + command} Hai`);
    await m.react('🕘');
    
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || "";
        
        let response;
        
        if (!mime) {
            // Text-only query using Gemini-Pro
            const result = await modelPro.generateContent(text);
            const responseText = await result.response.text();
            
            response = responseText;
        } else {
            // Image query using Gemini-Pro-Vision
            if (!/image\/(png|jpe?g)/.test(mime)) {
                return m.reply("Hanya mendukung format gambar PNG dan JPEG!");
            }
            
            const media = await q.download();
            const link = await Uploader.catbox(media);
            
            // Convert image to base64
            const imageResponse = await axios.get(link, { responseType: 'arraybuffer' });
            const imageBase64 = Buffer.from(imageResponse.data).toString('base64');
            
            const imageParts = [{
                inlineData: {
                    data: imageBase64,
                    mimeType: mime
                }
            }];
            
            const result = await modelVision.generateContent([text, ...imageParts]);
            const responseText = await result.response.text();
            
            response = responseText;
        }
        
        // Kirim respons dengan format yang diminta
        await conn.sendMessage(m.chat, {
            text: response,
            contextInfo: {
                externalAdReply: {
                    title: 'Artificial Intelligence',
                    thumbnailUrl: 'https://telegra.ph/file/06c03ab79eab045fcaf26.jpg',
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
        
    } catch (error) {
        console.error('Error:', error);
        m.reply("Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi." + error);
    }
};

handler.help = ["gemini", "bard"].map(a => a + " *<text>*");
handler.tags = ["ai"];
handler.command = /^(gemini|bard)$/i;
handler.premium = false;
handler.register = false
handler.limit = true;

module.exports = handler;