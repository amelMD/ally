/** !! THIS CODE GENERATE BY ALLY !! **/

const fetch = require('node-fetch');

const handler = async (m, { args, conn }) => {
    if (!args[0]) return m.reply("❌ Format salah!\n\nContoh:\n*nulis Nama|Kelas|Mata Pelajaran|Tanggal|Isi Teks|Font|Format*\n\nContoh:\n*nulis Taufik|XII - Bio A|Sexual Organs|2025-03-30|saya akan menjelaskan tentang bot WhatsApp|MHHY|png*");

    let [name, classroom, subject, date, content, fontShort, format] = args.join(" ").split("|");

    if (!name || !classroom || !subject || !date || !content || !fontShort || !format) {
        return m.reply("❌ Pastikan semua parameter diisi dengan benar!");
    }

    // Mapping font biar ga ribet
    let fonts = {
        HCR: "HandwritingCR-2.ttf",
        GLR: "GloriaHallelujah-Regular.ttf",
        SILR: "ShadowsIntoLight-Regular.ttf",
        MHHY: "MyHandsareHoldingYou.ttf"
    };

    let font = fonts[fontShort.toUpperCase()];
    if (!font) return m.reply("❌ Font tidak valid! Pilih dari: HCR, GLR, SILR, MHHY");

    let apiUrl = `https://fastrestapis.fasturl.cloud/tool/texttonote?name=${encodeURIComponent(name)}&classroom=${encodeURIComponent(classroom)}&subject=${encodeURIComponent(subject)}&date=${encodeURIComponent(date)}&content=${encodeURIComponent(content)}&font=${encodeURIComponent(font)}&format=${encodeURIComponent(format)}`;

    try {
        m.reply("📝 Sedang membuat tulisan...");

        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Gagal mengambil gambar, status: ${response.status}`);

        let buffer = await response.buffer();

        await conn.sendMessage(m.chat, {
            image: buffer,
            caption: `📝 Tulisan berhasil dibuat untuk *${name}* di kelas *${classroom}*!`
        }, { quoted: m });

    } catch (error) {
        console.error("❌ Error saat fetch API:", error);
        m.reply("❌ Terjadi kesalahan saat membuat tulisan, coba lagi nanti.");
    }
};

handler.command = /^(nulis)$/i;
handler.help = ["nulis"].map(v => v + " <format>");
handler.tags = ["tools"];
handler.limit = false;

module.exports = handler;