/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn, args, command, text }) => {
    let group = text ? text : m.chat

    // pantun
    let pantun = [
        "Hidup sendirian tanpa kekasih,\nCukup sekian, terima kasih. (≧ω≦)ゞ",
        "Pergi ke pasar membeli manggis,\nPamit keluar, jangan menangis.",
        "Sore hari memetik melati,\nSelamat tinggal, sampai nanti.",
        "Main layang-layang di taman kota,\nKeluar grup, semoga kita jumpa.",
        "Beli es krim di kota tua,\nSelamat tinggal, tetap bahagia.",
        "Jalan-jalan ke Kota Malang,\nAku pergi, janganlah bimbang.",
        "Makan siang di tepi pantai,\nAku pamit, semoga damai.",
        "Ke rumah nenek membeli roti,\nSampai jumpa lagi di lain hari.",
        "Malam-malam makan martabak,\nSelamat tinggal, aku melangkah.",
        "Main bola di lapangan luas,\nAku pamit, jaga terus suasana.",
        "Pergi ke taman memetik bunga,\nSelamat tinggal, sampai kita berjumpa.",
        "Menanam padi di sawah sejuk,\nAku keluar, janganlah terpuruk.",
        "Pagi hari minum kopi,\nPamit undur, hati-hati di sini.",
        "Jalan-jalan ke pantai Bali,\nAku pergi, semoga damai kembali.",
        "Beli jeruk di pasar sore,\nSampai jumpa di lain waktu yang ceria.",
        "Naik kapal berlayar jauh,\nAku pamit, semoga tak gundah gulana.",
        "Bermain gitar sambil bernyanyi,\nAku keluar, jangan rindu nanti.",
        "Pergi ke hutan mencari kayu,\nPamit sekarang, jangan mengganggu.",
        "Beli perhiasan di toko emas,\nAku pamit, semoga tetap cemas.",
        "Berlayar jauh ke pulau sepi,\nAku keluar, jangan menangis lagi."
    ];

    // Pilih pantun secara acak
    let randomPantun = pantun[Math.floor(Math.random() * pantun.length)];

    // Kirim pantun yang terpilih
    await conn.reply(group, randomPantun, null) 
    await conn.groupLeave(group)
}

handler.help = ['leavegc', 'out']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i

handler.rowner = true

module.exports = handler