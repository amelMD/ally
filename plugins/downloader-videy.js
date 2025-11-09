/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
const cheerio = require('cheerio');

const Videydl = async(m, { text }) => {
	
	if (!text) return  conn.reply(m.chat, 
	`Input Link From Videy!\n\nExample: .videydl https://videy.co/v?id=ailVPy1S`,
	m)
	if (!/^http(s):\/\/videy\.co/i.test(text)) {
	return m.reply('Link Invalid');
	};
	await m.react('🕒')
	let request = await videy(text)
	await conn.sendMessage(
                m.chat, {
                    video: {
                        url: request,
                    },
                    caption: set.footer,
                }, {
                    quoted: m
                },
            );
}
Videydl.help = ["videydl", "videy"];
Videydl.tags = ["downloader", "premium"];
Videydl.command = /^(videy|videydl)$/i;

Videydl.premium = true

module.exports = Videydl;

function videy(url) {
    return `https://cdn.videy.co/${url.split("?id=")[1]}.mp4`
}