/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const cheerio = require('cheerio');
/*
• SCRAPER BY HANN
• THIS FITUR CODE CRETAED BY PUTRAMODZ
• DON'T DELETE THIS WM
*/
function formatNumber(number) {
    if (number >= 1e6) return (number / 1e6).toFixed(1).replace(/\.0$/, '') + 'm';
    if (number >= 1e3) return (number / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
    return number.toString();
}
async function tiktokStalk(username) {
    try {
        const response = await axios.get(`https://www.tiktok.com/@${username}?_t=ZS-8tHANz7ieoS&_r=1`);
        const html = response.data;
        const $ = cheerio.load(html);
        const scriptData = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();
        const parsedData = JSON.parse(scriptData);

        const userDetail = parsedData.__DEFAULT_SCOPE__?.['webapp.user-detail'];
        if (!userDetail) {
            throw new Error('User tidak ditemukan');
        }

        const userInfo = userDetail.userInfo?.user;
        const stats = userDetail.userInfo?.stats;

        const metadata = {
            userInfo: {
                id: userInfo?.id || null,
                username: userInfo?.uniqueId || null,
                nama: userInfo?.nickname || null,
                avatar: userInfo?.avatarLarger || null,
                bio: userInfo?.signature || null,
                verifikasi: userInfo?.verified || false,
                totalfollowers: stats?.followerCount || 0,
                totalmengikuti: stats?.followingCount || 0,
                totaldisukai: stats?.heart || 0,
                totalvideo: stats?.videoCount || 0,
                totalteman: stats?.friendCount || 0,
            }
        };

        return metadata;
    } catch (error) {
        return {
            error: error.message
        };
    }
}

let Amelia = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) return conn.reply(m.chat, `Gunakan format: ${usedPrefix + command} <username>`, m);
    try {
        const result = await tiktokStalk(text);
        if (result.error) {
            return conn.reply(m.chat, `Terjadi kesalahan: ${result.error}`, m);
        }

        const {
            userInfo: {
                username,
                nama,
                bio,
                avatar,
                verifikasi,
                totalfollowers,
                totalmengikuti,
                totaldisukai,
                totalvideo,
                totalteman
            }
        } = result;

        const message = `
*👤 Profil TikTok: ${username}*
- Nama: ${nama}
- Bio: ${bio || '-'}
- Verifikasi: ${verifikasi ? '✔️' : '❌'}
- Followers: ${formatNumber(totalfollowers)}
- Mengikuti: ${formatNumber(totalmengikuti)}
- Disukai: ${formatNumber(totaldisukai)}
- Total Video: ${totalvideo}
- Total Teman: ${totalteman}
`.trim();
        await conn.sendFile(m.chat, avatar, `${username}.jpg`, message, m);
    } catch (err) {
        conn.reply(m.chat, `Terjadi kesalahan: ${err.message}`, m);
    }
};

Amelia.help = ['tiktokstalk <username>'];
Amelia.tags = ['tools'];
Amelia.command = /^tiktokstalk|ttstalk$/i;
Amelia.limit = true

module.exports = Amelia;