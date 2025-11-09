/** !! THIS CODE GENERATE BY ALLY !! **/

//*<>QR, SUPPORT TEXT DAN READ QR!! ( DIJADIIN 1 )<>*
//SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
//DON'T DELETE THIS WM!
//HAPUS WM MANDUL 7 TURUNAN 
//HAPUS WM=SDM RENDAH  
//`BAGI YANG RECODE DAN YANG MENYESUAIKAN LAGI NI CODE, MOHON UNTUK JANGAN DIHAPUS WM PERTAMA, ATAU BERI CREDIT LINK CH YANG SHARE CODE INI!`
//"aku janji tidak akan hapus wm ini, karena amanah ini harus saya pegang!"
//SELASA, 18 MARET 2025 05:41
const fs = require('fs');
const qrcode = require('qrcode');
const Jimp = require('jimp');
const qrcodeReader = require('qrcode-reader');

const handler = async (m, { conn, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";

    //wwwmmmm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    if (text) {
        try {
            const qrImage = await qrcode.toBuffer(text, { errorCorrectionLevel: 'H' });
            await conn.sendFile(m.chat, qrImage, 'qrcode.png', `📌 *QR Code untuk:*\n${text}`, m);
        } catch (err) {
            console.error(err);
            m.reply('❌ Terjadi kesalahan saat membuat QR Code.');
        }
        return;
    }

    //hapus??=mandul https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    if (/image/.test(mime)) {
        try {
            const media = await q.download();
            const image = await Jimp.read(media);
            const qr = new qrcodeReader();
            const value = await new Promise((resolve, reject) => {
                qr.callback = (err, res) => {
                    if (err) reject(err);
                    resolve(res ? res.result : null);
                };
                qr.decode(image.bitmap);
            });

            if (value) {
                m.reply(`📌 *Hasil Scan QR Code:*\n\n${value}`);
            } else {
                m.reply('⚠ QR Code tidak ditemukan atau tidak terbaca.');
            }
        } catch (err) {
            console.error(err);
            m.reply('❌ Terjadi kesalahan saat membaca QR Code.');
        }
        return;
    }

    //https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    m.reply('⚠ kirim atau reply gambar QR Code untuk membaca, atau gunakan *qr <teks/url>* untuk membuat QR Code.');
};

handler.command = /^qr$/i;
handler.help = ['qr <teks/url> (buat QR)', 'qr (reply gambar) (baca QR)'];
handler.tags = ['tools'];

module.exports = handler;
//*<>QR, SUPPORT TEXT DAN READ QR!! ( DIJADIIN 1 )<>*
//SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
//DON'T DELETE THIS WM!
//HAPUS WM MANDUL 7 TURUNAN 
//HAPUS WM=SDM RENDAH  
//`BAGI YANG RECODE DAN YANG MENYESUAIKAN LAGI NI CODE, MOHON UNTUK JANGAN DIHAPUS WM PERTAMA, ATAU BERI CREDIT LINK CH YANG SHARE CODE INI!`
//"aku janji tidak akan hapus wm ini, karena amanah ini harus saya pegang!"
//SELASA, 18 MARET 2025 05:41