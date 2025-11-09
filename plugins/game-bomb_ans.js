/** !! THIS CODE GENERATE BY ALLY !! **/

const util = require('util');
/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/
let handler = m => m;
handler.before = async function (m) {
    try {
        let id = m.sender;
        let timeout = 180000;
        let reward = randomInt(100, 800);
        let users = global.db.data.users[m.sender];
        let body = (typeof m.text === 'string' ? m.text : '');
        conn.tebakbom = conn.tebakbom || {};

        // Menyerah
        let isSurrender = /^(suren)$/i.test(body);
        if (isSurrender) {
            await conn.reply(m.chat, `🚩 Menyerah`, m);
            clearTimeout(conn.tebakbom[id].timeout);
            delete conn.tebakbom[id];
            return;
        }

        // Memeriksa dan membuka kotak
        if (id in conn.tebakbom && !isNaN(body)) {
            let index = parseInt(body) - 1;
            if (conn.tebakbom[id].petak[index] === 1) return !0;
            if (conn.tebakbom[id].petak[index] === 2) {
                conn.tebakbom[id].board[index] = '💣';
                conn.tebakbom[id].pick++;
                conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                conn.tebakbom[id].bomb--;
                conn.tebakbom[id].nyawa.pop();
/** !! CREATED BY PUTRAMODZ !! **/
                if (conn.tebakbom[id].nyawa.length < 1) {
                    global.db.data.users[m.sender].limit -= 1;
                    await m.reply(`*GAME TELAH BERAKHIR*\nKamu terkena bomb\n\n${conn.tebakbom[id].board.join('')}\n\n*Terpilih :* ${conn.tebakbom[id].pick}\n_Pengurangan Limit : 1_`);
                    conn.sendMessage(m.chat, { react: { text: '😂', key: m.key } });
                    clearTimeout(conn.tebakbom[id].timeout);
                    delete conn.tebakbom[id];
                } else {
                    await m.reply(`*PILIH ANGKA*\n\nKamu terkena bomb\n${conn.tebakbom[id].board.join('')}\n\nTerpilih: ${conn.tebakbom[id].pick}\nSisa nyawa: ${conn.tebakbom[id].nyawa}`);
                }
                return !0;
            }
            if (conn.tebakbom[id].petak[index] === 0) {
                conn.tebakbom[id].petak[index] = 1;
                conn.tebakbom[id].board[index] = '🌀';
                conn.tebakbom[id].pick++;
                conn.tebakbom[id].lolos--;

                if (conn.tebakbom[id].lolos < 1) {
                    global.db.data.users[m.sender].limit += 3;
                    global.db.data.users[m.sender].uang += 3000;
                    await m.reply(`*KAMU HEBAT ಠ⁠ᴥ⁠ಠ*\n\n${conn.tebakbom[id].board.join('')}\n\n*Terpilih :* ${conn.tebakbom[id].pick}\n*Sisa nyawa :* ${conn.tebakbom[id].nyawa}\n*Bomb :* ${conn.tebakbom[id].bomb}\n*Hadiah :* Uang(3000) & Limit(3)`);
                    clearTimeout(conn.tebakbom[id].timeout);
                    delete conn.tebakbom[id];
                } else {
                    m.reply(`*PILIH ANGKA*\n\n${conn.tebakbom[id].board.join('')}\n\nTerpilih : ${conn.tebakbom[id].pick}\nSisa nyawa : ${conn.tebakbom[id].nyawa}\nBomb : ${conn.tebakbom[id].bomb}`);
                }
            }
        }
    } catch (e) {
        return conn.reply(m.chat, util.format(e), m);
    }
    return !0;
}

handler.exp = 0;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(number) {
    return number.toLocaleString();
}

module.exports = handler;