/** !! THIS CODE GENERATE BY ALLY !! **/

let { webp2mp4 } = require('../lib/togif.js')

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `Balas stiker dengan caption *${usedPrefix + command}*`;
    let mime = m.quoted.mimetype || '';
    if (!/webp/.test(mime)) throw `Balas stiker dengan caption *${usedPrefix + command}*`;
    m.react('🕒')
    let media = await m.quoted.download();
    let out = Buffer.alloc(0);
    if (/webp/.test(mime)) {
        out = await webp2mp4(media);
    }
    conn.sendFile(m.chat, out, 'pp.mp4', set.wm, m, true, { gifPlayback: true, gifAttribution: 2 });
};

handler.help = ['togif'];
handler.tags = ['sticker'];
handler.command = /^(togif)$/i;

module.exports = handler;