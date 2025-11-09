/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp'); // Gantilah ImageMagick dengan Sharp
const { writeFile, unlink } = require('fs/promises');
const path = require('path');
 
const stickerLy = async (urlSticker) => {
  try {
    const { data: html } = await axios.get(urlSticker);
    const $ = cheerio.load(html);
 
    const packName = $("meta[property='og:title']").attr("content") || "Tidak diketahui";
    const creator = $(".creator-name").text().trim() || "Tidak diketahui";
 
    const stickers = [];
    $('#content_images .sticker_img').each((i, el) => {
      let imageUrl = ($(el).attr("onerror") + "").split("src='")[1].split("';")[0];
      if (imageUrl) stickers.push(imageUrl);
    });
 
    if (stickers.length === 0) {
      throw new Error("Tidak ada stiker ditemukan di URL tersebut.");
    }
 
    return { packName, creator, stickers };
  } catch (error) {
    throw new Error("Terjadi kesalahan saat memuat data: " + error.message);
  }
};
 
const downloadAndConvertSticker = async (url) => {
  try {
    const { data } = await axios.get(url, { responseType: "arraybuffer" });
    const tempFilePath = path.resolve(`./temp_sticker_${Date.now()}.png`);
    const outputFilePath = tempFilePath.replace(/\.(png|jpg|jpeg)$/, ".webp");
    await writeFile(tempFilePath, data);
    await sharp(tempFilePath)
      .resize(512, 512, { fit: "inside" })
      .toFormat("webp")
      .toFile(outputFilePath);
    await unlink(tempFilePath);
    return outputFilePath;
  } catch (error) {
    throw new Error("Gagal mengunduh atau mengonversi stiker: " + error.message);
  }
};
const handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) {
    throw `Masukkan URL Stickerly yang valid!\nContoh: ${usedPrefix + command} https://sticker.ly/s/123456`;
  }
 
  try {
    const urlSticker = text.trim();
    if (!urlSticker.startsWith("https://sticker.ly/s/")) {
      throw "URL tidak valid! Pastikan URL dimulai dengan https://sticker.ly/s/";
    }
    const { packName, creator, stickers } = await stickerLy(urlSticker);
    m.react('🕘')
    let infoMessage = `*Detail Sticker Pack*\n\n`;
    infoMessage += `*Nama Pack:* ${packName}\n`;
    infoMessage += `*Pembuat:* ${creator}\n`;
    infoMessage += `*Jumlah Stiker:* ${stickers.length}\n`;
    infoMessage += `*URL:* ${urlSticker}\n\n_Mengirim stiker, harap tunggu..._`;
    await m.reply(infoMessage);
    for (const sticker of stickers) {
      const webpPath = await downloadAndConvertSticker(sticker);
 
      await conn.sendMessage(m.chat, { 
        sticker: { url: webpPath } 
      }, { quoted: m });
 
      await unlink(webpPath);
    }
 
    await m.reply(`*Selesai!*\nBerhasil mengirim ${stickers.length} stiker dari URL: ${urlSticker}`);
  } catch (error) {
    console.error(error);
    await m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};
handler.command = ["stickerly", "stickerpack"];
handler.tags = ["sticker"];
handler.help = ["stickerly <url>"];
 
module.exports = handler;