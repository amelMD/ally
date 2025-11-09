/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text && command === 'animexinsearch') throw `*[❗] Usage:* ${usedPrefix + command} <keyword>\n\nContoh: ${usedPrefix + command} fantasy`;
    if (!text && command === 'animexindetail') throw `*[❗] Usage:* ${usedPrefix + command} <url>\n\nContoh: ${usedPrefix + command} https://animexin.dev/renegade-immortal-episode-71-indonesia-english-sub/`;

    try {
        let result;
        if (command === 'animexinupdate') {
            result = await animexinUpdate();
            if (result.length === 0) throw 'Tidak ada pembaruan terbaru.';
            const updateText = result.map((anime, i) => `*${i + 1}. ${anime.title}*\n∘ Episode: ${anime.episode}\n∘ Tipe: ${anime.type}\n∘ [Detail](${anime.url})\n`).join('\n');
            conn.reply(m.chat, updateText, m);
        } else if (command === 'animexinsearch') {
            result = await animexinSearch(text);
            if (result.length === 0) throw 'Anime tidak ditemukan.';
            const searchText = result.map((anime, i) => `*${i + 1}. ${anime.title}*\n∘ Status: ${anime.status}\n∘ Tipe: ${anime.type}\n∘ [Detail](${anime.url})\n`).join('\n');
            conn.reply(m.chat, searchText, m);
        } else if (command === 'animexindetail') {
            result = await animexinDetail(text);
            const { title, episodeTitle, image, description, downloadLinks, genres } = result;
            const detailText = `*${title}*\n∘ Episode: ${episodeTitle}\n∘ Genres: ${genres.join(', ')}\n\n*Deskripsi:* ${description}\n\n*Tautan Unduhan:*\n${downloadLinks.map(dl => `• ${dl.subtitleType}:\n${dl.links.map(link => `  - ${link.url}`).join('\n')}`).join('\n\n')}`;
            await conn.sendFile(m.chat, image, 'poster.jpg', detailText, m);
        }
    } catch (error) {
        console.error(error);
        throw '*[❗] Terjadi kesalahan saat memproses permintaan. Coba lagi nanti.*';
    }
};

handler.help = ['animexinupdate', 'animexinsearch <keyword>', 'animexindetail <url>'];
handler.tags = ['anime'];
handler.command = /^(animexinupdate|animexinsearch|animexindetail)$/i;

module.exports = handler;

// Scraper Functions
async function animexinUpdate() {
    try {
        const { data } = await axios.get('https://animexin.dev/');
        const $ = cheerio.load(data);
        const animeList = [];

        $('.listupd .bsx').each((index, element) => {
            const title = $(element).find('h2[itemprop="headline"]').text();
            const url = $(element).find('a[itemprop="url"]').attr('href');
            const image = $(element).find('img[itemprop="image"]').attr('src');
            const episode = $(element).find('.eggepisode').text();
            const type = $(element).find('.eggtype').text();

            animeList.push({ title, url, image, episode, type });
        });

        return animeList;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function animexinDetail(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const episodeData = {
            title: $('h2[itemprop="partOfSeries"]').text(),
            episodeTitle: $('h2[itemprop="headline"]').text(),
            image: $('.thumb img[itemprop="image"]').attr('src'),
            description: $('.desc.mindes').text().trim(),
            genres: $('.genxed a').map((i, el) => $(el).text()).get(),
            downloadLinks: []
        };

        $('.mctnx .soraddlx').each((index, element) => {
            const subtitleType = $(element).find('.sorattlx h3').text();
            const links = $(element).find('.soraurlx a').map((i, el) => ({
                url: $(el).attr('href')
            })).get();

            episodeData.downloadLinks.push({ subtitleType, links });
        });

        return episodeData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function animexinSearch(keyword) {
    try {
        const { data } = await axios.get(`https://animexin.dev/?s=${encodeURIComponent(keyword)}`);
        const $ = cheerio.load(data);

        const animeList = [];

        $('.listupd article.bs').each((index, element) => {
            const title = $(element).find('h2[itemprop="headline"]').text();
            const url = $(element).find('a[itemprop="url"]').attr('href');
            const image = $(element).find('img[itemprop="image"]').attr('src');
            const status = $(element).find('.epx').text();
            const subtitle = $(element).find('.sb').text();
            const type = $(element).find('.typez').text();

            animeList.push({ title, url, image, status, subtitle, type });
        });

        return animeList;
    } catch (error) {
        console.error(error);
        return [];
    }
}