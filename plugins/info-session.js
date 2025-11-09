/** !! THIS CODE GENERATE BY ALLY !! **/

const fs = require('fs');
const path = require('path');

let handler = async (m, { conn }) => {
    let dir = './Ally-Sessions';
    let totalFiles = fs.readdirSync(dir).length;
    let totalSize = getTotalSize(dir);
    let percent = Math.min(100, totalFiles / 200 * 100); // Hitung persentase, maksimal 100%

    let formattedText, emoji;
    if (totalFiles > 200) {
        formattedText = `Session folder fulll 🔴 (${totalFiles}/200)`;
        emoji = '🔴';
    } else {
        formattedText = `Secure session folder 🟡 (${totalFiles}/200)`;
        emoji = '🟡';
    }

    let message = `乂  *S E S S I O N - I N F O*

➜  *Total session:* ${totalFiles} files
➜  *Total size:* ${formatBytes(totalSize)}
➜  *Status:* ${formattedText}
➜  *Persentase:* ${percent.toFixed(2)}%`;

    conn.reply(m.chat, message, m, { contextInfo: { mentionedJid: conn.parseMention(message) } });
}

handler.help = ['infosession'];
handler.tags = ['info'];
handler.command = /^(info(session|sesi)|cek(session|sesi)|sesi)$/i;

module.exports = handler;

function getTotalSize(dir) {
    let totalSize = 0;
    let files = fs.readdirSync(dir);
    for (let file of files) {
        let filePath = path.join(dir, file);
        let stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            totalSize += getTotalSize(filePath);
        } else {
            totalSize += stats.size;
        }
    }
    return totalSize;
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}