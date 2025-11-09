/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Format salah!\nGunakan: .receipt toko|id_transaksi|harga_admin|nomor_tujuan|barang1-harga1,barang2-harga2,Seterusnya|metode_pembayaran(A/B)\n\n*Example :* .struk2 Ally|1635182|4500|3|Rinso-4000,Royco-2000|A");

  let [toko, idTransaksi, hargaAdmin, nomorTujuan, items, metodePembayaran] = text.split("|");
  if (!toko || !idTransaksi || !hargaAdmin || !nomorTujuan || !items || !metodePembayaran) return m.reply("*Format tidak lengkap*");

  let daftarBarang = items.split(",").map((item, index) => {
    let [nama, harga] = item.split("-");
    return { nomor: index + 1, nama, harga };
  });

  const quotes = [
    "Bisnis itu susah dulu baru senang,\nkalo senang dulu baru susah kredit namanya.",
    "Tidak ada persaingan di hidupku,\nmales buat bersaing dengan siapapun,\nkamu tidak bisa menjadi aku dan aku tidak tertarik dengan\nhidupmu.",
    "Masa muda ga datang dua kali,\nenjoy your life,\nutamakan hal yang membuatmu senang\ndaripada hal yang membuatmu sakit."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteLines = randomQuote.split("\n");

  // Ambil tanggal real-time tanpa jam
  let today = new Date();
  let formattedDate = today.toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' });

  // Konversi metode pembayaran (A = COD, B = Transfer)
  let metodeText = metodePembayaran.toUpperCase() === "A" ? "Cash" : "Transfer";
  let isCOD = metodePembayaran.toUpperCase() === "A";

  // Hitung tinggi canvas yang dibutuhkan
  const baseHeight = 500;
  const itemHeight = daftarBarang.length * 30;
  const quoteHeight = quoteLines.length * 20 + 60;
  const paymentHeight = isCOD ? 50 : 30; // Jika COD, tambahkan ruang ekstra
  const canvasHeight = baseHeight + itemHeight + quoteHeight + paymentHeight;

  const canvasWidth = 400;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.font = "bold 20px monospace";
  ctx.textAlign = "center";
  ctx.fillText(toko.toUpperCase(), canvasWidth / 2, 40);

  ctx.font = "14px monospace";
  ctx.fillText(formattedDate, canvasWidth / 2, 65);
  ctx.textAlign = "left";
  ctx.fillText(`ID Transaksi: ${idTransaksi}`, 20, 100);
  ctx.fillText(`Nomor Tujuan: ${nomorTujuan}`, 20, 125);
  ctx.beginPath();
  ctx.moveTo(20, 150);
  ctx.lineTo(canvasWidth - 20, 150);
  ctx.stroke();
  
  let startY = 175;
  daftarBarang.forEach((item, i) => {
    ctx.fillText(`${item.nomor}. ${item.nama} - Rp${parseInt(item.harga).toLocaleString()}`, 20, startY + i * 30);
  });

  let lastItemY = startY + daftarBarang.length * 30 + 10;
  ctx.beginPath();
  ctx.moveTo(20, lastItemY);
  ctx.lineTo(canvasWidth - 20, lastItemY);
  ctx.stroke();

  let totalHarga = daftarBarang.reduce((sum, item) => sum + parseInt(item.harga), 0);
  let totalKeseluruhan = totalHarga + parseInt(hargaAdmin);

  ctx.fillText(`Total: Rp${totalHarga.toLocaleString()}`, 20, lastItemY + 25);
  ctx.fillText(`Admin: Rp${parseInt(hargaAdmin).toLocaleString()}`, 20, lastItemY + 50);
  ctx.fillText(`Total Keseluruhan: Rp${totalKeseluruhan.toLocaleString()}`, 20, lastItemY + 75);

  // Tambahkan metode pembayaran
  let paymentStartY = lastItemY + 100;
  ctx.font = "bold 14px monospace";
  ctx.fillText(`Metode Pembayaran: ${metodeText}`, 20, paymentStartY);

  if (isCOD) {
    ctx.font = "italic 12px monospace";
    ctx.fillText("Siapkan uang pas, tidak menerima kembalian.", 20, paymentStartY + 20);
  }

  // Tambahkan pembatas untuk quotes
  let quoteStartY = paymentStartY + (isCOD ? 50 : 30);
  ctx.beginPath();
  ctx.moveTo(20, quoteStartY - 15);
  ctx.lineTo(canvasWidth - 20, quoteStartY - 15);
  ctx.stroke();

  // Tampilkan quotes dengan teks rata tengah
  ctx.font = "italic 12px monospace";
  ctx.textAlign = "center";
  quoteLines.forEach((line, i) => {
    ctx.fillText(line, canvasWidth / 2, quoteStartY + i * 20);
  });

  // Tambahkan pembatas bawah quotes
  let quoteEndY = quoteStartY + quoteLines.length * 20 + 10;
  ctx.beginPath();
  ctx.moveTo(20, quoteEndY);
  ctx.lineTo(canvasWidth - 20, quoteEndY);
  ctx.stroke();

  // Tampilkan "THANK YOU" di bawah quotes
  let thankYouStartY = quoteEndY + 30;
  ctx.font = "bold 14px monospace";
  ctx.fillText("THANK YOU FOR SHOPPING AT", canvasWidth / 2, thankYouStartY);
  ctx.fillText(toko.toUpperCase(), canvasWidth / 2, thankYouStartY + 20);

  const buffer = canvas.toBuffer("image/png");
  const filePath = path.join(__dirname, "../tmp/receipt.png");
  fs.writeFileSync(filePath, buffer);

  await conn.sendMessage(m.chat, { image: { url: filePath }, caption: "🧾 *Struk Pembelian*" }, { quoted: m });

  fs.unlinkSync(filePath);
};

handler.help = ['receipt'];
handler.tags = ['tools'];
handler.command = /^(receipt|struk2?)$/i;

module.exports = handler;