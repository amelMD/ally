/** !! THIS CODE GENERATE BY ALLY !! **/

const cheerio = require('cheerio');
const { basename, extname } = require('path');
const mime = require('mime-types');

async function mediafire(url) {
    try {
        const $ = cheerio.load(await (await fetch(url.trim())).text());
        const title = $("meta[property='og:title']").attr("content")?.trim() || "Unknown";
        const size = /Download\s*\(([\d.]+\s*[KMGT]?B)\)/i.exec($.html())?.[1] || "Unknown";
        let dl = $("a.popsok[href^='']").attr("href")?.trim() || $("a.popsok:not([href^='javascript'])").attr("href")?.trim();
        if (!dl) {
            throw new Error("Download URL not found.");
        }
        return { name: title, filename: basename(dl), type: extname(dl), size, download: dl, link: url.trim() };
    } catch (error) {
        console.error("Error in mediafire function:", error);
        throw error;
    }
}

let handler = async (m, { conn, args, command }) => {
    try {
        if (!args[0]) return m.reply(`*Example :* .${command} <mediafire link>`);
        let data = await mediafire(args[0]);
        let mimetype = mime.lookup(data.filename) || 'application/octet-stream';
        await conn.sendMessage(m.chat, { document: { url: data.download }, mimetype, fileName: data.filename }, { quoted: m });
    } catch (e) {
        m.reply(e.message);
    }
};

handler.help = ['mediafire <url>'];
handler.command = ['mediafire', 'mf'];
handler.tags = ['downloader'];

module.exports = handler;