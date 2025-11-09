/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let pkg = require('@whiskeysockets/baileys');
const { WA_DEFAULT_EPHEMERAL, groupToggleEphemeral } = pkg;

const options = {
    'on': WA_DEFAULT_EPHEMERAL,
    'off': 0,
    '1d': 86400,
    '7d': 604800,
    '90d': 7776000
};

const handler = async (m, { conn, text, usedPrefix, isAdmin, isOwner, command }) => {
    if (!isAdmin && !isOwner) {
        return m.reply(`*Maaf, Command ini hanya bisa digunakan oleh admin grup.`);
    }

    const lowercaseText = text.toLowerCase();
    const selectedOption = options[lowercaseText];

    if (selectedOption !== undefined) {
        conn.groupToggleEphemeral(m.chat, selectedOption);
        const response = selectedOption === 0 ? 'matikan.' : selectedOption === WA_DEFAULT_EPHEMERAL ? 'nyalakan.' : `set untuk *${lowercaseText}*`;
        m.reply(`*ephemeral* berhasil di ${response}`);
    } else {
        const usage = `Usage: *${usedPrefix + command} <options>*\nExample: *${usedPrefix + command} 1d*\n\n[ List Options ]\n• *on* ( WA Default )\n• *off* ( disable )\n• *1d* ( 1 hari )\n• *7d* ( 7 hari )\n• *90d* ( 90 hari )`;
        m.reply(usage);
    }
};

handler.help = ['setephemeral'];
handler.tags = ['group'];
handler.group = true
handler.command = /^((set)?ep(hem(eral)?)?|psgc|gcps|(ps|pesan)?sementara)$/i;

module.exports = handler;