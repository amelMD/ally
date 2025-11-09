/** !! THIS CODE GENERATE BY ALLY !! **/

const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const ocrapi = require("ocr-space-api-wrapper");
const fakeUserAgent = require("fake-useragent");
const crypto = require("crypto");

let handler = async (m, { conn }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) throw `Balas gambar dengan perintah .ocr`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Jenis ${mime} tidak didukung!*_`;

    let img = await q.download();
    let url = await uploadToCatbox(img);
    
    let hasil = await ocrapi.ocrSpace(url);
    await conn.reply(m.chat, hasil.ParsedResults[0].ParsedText, m);
};

handler.help = ['ocr', 'totext'];
handler.tags = ['tools'];
handler.command = /^(ocr|totext)$/i;
handler.limit = true;

module.exports = handler;

async function uploadToCatbox(content) {
    try {
        const { ext } = (await fromBuffer(content)) || {};
        let formData = new FormData();
        formData.append("reqtype", "fileupload");
        formData.append("fileToUpload", content, `${crypto.randomBytes(5).toString("hex")}.${ext}`);

        let response = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": fakeUserAgent(),
            },
        });

        let url = await response.text();
        if (!url.startsWith("https://")) throw "Gagal mengunggah gambar!";
        return url;
    } catch (error) {
        throw "Terjadi kesalahan saat mengunggah gambar.";
    }
}