/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Gunakan: ${usedPrefix + command} <query>\nAtau gunakan: ${usedPrefix + command} detail <link>`);

    let args = text.split(' ');
    
    if (args[0].toLowerCase() === 'detail' && args[1]) {
        let url = args[1];
        if (!url.startsWith('https://whatsgrouplink.com/')) return m.reply('Gunakan link dari *whatsgrouplink.com*');
        
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            const content = $('.entry-content').html();
            let description = content.split('<div style="margin-top: 0px; margin-bottom: 0px;" class="sharethis-inline-share-buttons"></div>')[1];
            description = cheerio.load(description.split('<h3')[0]).text().replace(/\n+/g, '\n').trim();

            let sections = ['rules', 'links', 'how', 'related'];
            let details = {};

            $('.entry-content ul').each((i, el) => {
                let list = [];
                $(el).find('li').each((_, li) => {
                    if (i % 2 === 0) list.push($(li).text());
                    else {
                        let item = { title: $(li).text().split('–')[0].trim(), link: $(li).find('a').attr('href') };
                        list.push(item);
                    }
                });
                details[sections[i]] = list;
            });

            let detailText = `📌 *Detail Grup WhatsApp*\n\n📜 *Deskripsi:*\n${description}\n\n📋 *Rules:*\n${details.rules ? details.rules.join('\n') : 'Tidak tersedia'}\n\n🔗 *Link Grup:* ${details.links && details.links.length ? details.links.map(l => l.link).join('\n') : 'Tidak ada'}`;
            
            m.reply(detailText);
        } catch (err) {
            console.error('Error:', err);
            m.reply('Terjadi kesalahan saat mengambil detail grup.');
        }
    } else {
        try {
            const { data } = await axios.get('https://whatsgrouplink.com/?s=' + text);
            const $ = cheerio.load(data);

            const items = [];
            $('article').each((_, element) => {
                const title = $(element).find('.entry-title-link').text().trim();
                const date = $(element).find('time').text().trim();
                const link = $(element).find('a').attr('href');
                const image = $(element).find('img').attr('src');
                items.push({ title, date, link, image });
            });

            if (!items.length) return m.reply('Tidak ditemukan.');

            let resultText = items.slice(0, 5).map((item, i) => 
                `*${i + 1}. ${item.title}*\n📅 ${item.date}\n🔗 *Detail:* ${item.link}`
            ).join('\n\n');

            m.reply(resultText);

        } catch (err) {
            console.error('Error:', err);
            m.reply('Terjadi kesalahan saat mengambil data.');
        }
    }
};

handler.help = ["whatsappgroup"];
handler.tags = ["internet"];
handler.command = ["wgl"];

module.exports = handler;