/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

const Genius = {
    async search(query) {
        const res = await axios.get('https://vapis.my.id/api/googlev1?q=site:genius.com lirik ' + encodeURIComponent(query));
        return res.data.data;
    },
    async lyric(url) {
        const res = await axios.get(url, {
            httpsAgent,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
            }
        });
        return eval(res.data.split('__PRELOADED_STATE__ = ')[1].split('window.__APP_CONFIG__ =')[0]);
    }
}

const handler = async (m, { text }) => {
    if (!text) return m.reply('Masukan judul');
    const s = await Genius.search(text);
    const l = await Genius.lyric(s[0].link);
    const lirik = cheerio.load(l?.songPage?.lyricsData?.body?.html ?? '').text();
    if (!lirik) return m.reply('Lirik tidak ditemukan');
    m.reply(lirik);
}

handler.help = ['lirik', 'genius'];
handler.tags = ['internet'];
handler.command = /^(lirik|genius)$/i;

module.exports = handler;