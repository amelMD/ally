/** !! THIS CODE GENERATE BY ALLY !! **/

let fetch = require('node-fetch');
// ©Mputz Don't Delete this wm
let handler = async (m, { args }) => {
    if (!args[0]) throw 'Link GitHub-nya mana?';

    let regexRepo = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    let regexGist = /https:\/\/gist\.github\.com\/([^\/]+)\/([a-zA-Z0-9]+)/i;
    let regexRelease = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/releases\/download\/([^\/]+)\/(.+)/i;

    let isRepo = regexRepo.test(args[0]);
    let isGist = regexGist.test(args[0]);
    let isRelease = regexRelease.test(args[0]);

    if (!isRepo && !isGist && !isRelease) throw 'Link salah atau tidak didukung!';

    if (isRepo && !isRelease) {
        let [, user, repo] = args[0].match(regexRepo) || [];
        repo = repo.replace(/.git$/, '');
        let api = `https://api.github.com/repos/${user}/${repo}`;
        let response = await fetch(api);
        let data = await response.json();

        let info = `*– 乂 Github Repository Info*\n`;
        info += `> *- Nama :* ${data.name}\n`;
        info += `> *- Pemilik :* ${data.owner.login}\n`;
        info += `> *- Bahasa Program :* ${data.language || "Tidak terdeteksi"}\n`;
        info += `> *- Total Bintang :* ${data.stargazers_count}\n`;
        info += `> *- Total Fork :* ${data.forks_count}\n`;
        info += `> *- Dibuat Sejak :* ${new Date(data.created_at).toLocaleString()}\n`;
        info += `> *- Terakhir Diperbarui :* ${new Date(data.updated_at).toLocaleString()}\n`;
        info += `> *- Result From :* ${args}\n`
        info += `\n${data.description || "Tidak ada deskripsi."}`;
        
        let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
        let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
        
        m.reply(`*Mohon tunggu, sedang mengirim repository..*`);
        await conn.sendMessage(m.chat, {
            document: { url: url },
            fileName: filename,
            mimetype: "application/zip",
            caption: info
        }, { quoted: m });
    } else if (isGist) {
        let [, user, gistId] = args[0].match(regexGist) || [];
        let url = `https://gist.github.com/${user}/${gistId}/download`;
        
        m.reply(`*Mohon tunggu, sedang mengirim Gist..*`);
        await conn.sendMessage(m.chat, {
            document: { url: url },
            fileName: `${gistId}.zip`,
            mimetype: "application/zip",
            caption: `*Result From*: ${args}`
        }, { quoted: m });
    } else if (isRelease) {
        let [, user, repo, tag, filename] = args[0].match(regexRelease) || [];
        let url = args[0];

        m.reply(`*Mohon tunggu, sedang mengirim file release..*`);
        await conn.sendMessage(m.chat, {
            document: { url: url },
            fileName: filename,
            mimetype: "application/octet-stream",
            caption: `*Result From*: ${args}`
        }, { quoted: m });
    }
};

handler.help = ['gitclone <url>'];
handler.tags = ['downloader'];
handler.command = /gitclone/i;
handler.limit = true;

module.exports = handler;