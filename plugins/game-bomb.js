/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, command, text }) => {
    if (!conn.tebakbom) conn.tebakbom = {};
    let id = m.sender;

    if (conn.tebakbom[id]) {
        return m.reply(`*Permainan sedang berlangsung!*`);
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
/** !! CREATED BY PUTRAMODZ !! **/
    conn.tebakbom[id] = {
        petak: shuffle([0, 0, 0, 2, 0, 2, 0, 2, 0, 0]),
        board: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'],
        bomb: 3,
        lolos: 7,
        pick: 0,
        nyawa: ['❤️', '❤️', '❤️'],
        timeout: setTimeout(() => {
            if (conn.tebakbom[id]) m.reply(`_Waktu sudah habis_`);
            delete conn.tebakbom[id];
        }, 120000)
    }

    conn.reply(m.chat, `*TEBAK BOM*\n\n${conn.tebakbom[id].board.join("")}\n\nPilih lah nomor tersebut! dan jangan sampai terkena Bom!\nBomb : ${conn.tebakbom[id].bomb}\nNyawa : ${conn.tebakbom[id].nyawa.join("")}`, m, {
    contextInfo: {
		    isForwarded: true,
            externalAdReply: {
                title: "[ G A M E - B O M B ]",
                body: "BY ALLY TEAM",
                sourceUrl: "",
                mediaType: 1,
                thumbnailUrl: "https://telegra.ph/file/1bd65daefb0b72ba0a7b6.jpg",
                renderLargerThumbnail: true,
            }
        }
    }
)
}

handler.help = ["bomb"];
handler.tags = ["game"];
handler.command = /^(bomb)$/i;
handler.group = true 

module.exports = handler;