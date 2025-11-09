/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

const fetch = require('node-fetch');
const sharp = require('sharp');
const { default: makeWASocket, MessageType, useSingleFileAuthState } = require('@whiskeysockets/baileys');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Penggunaan:\n${usedPrefix + command} teks`;

    m.react('🕒')
    let res = await fetch(`https://api-zalxzhu.vercel.app/api/tools/txtimg/ttp?text=${text}`);
    if (!res.ok) throw 'Gagal mengunduh gambar!';

    let imgBuffer = await res.buffer();

    // Convert image to WebP format for WhatsApp sticker
    let webpBuffer = await sharp(imgBuffer)
        .webp({ quality: 50 })
        .toBuffer();

    await conn.sendMessage(m.key.remoteJid, { sticker: webpBuffer });
}

handler.help = ["ttp"];
handler.tags = ["sticker"];
handler.command = ["ttp"];

module.exports = handler;