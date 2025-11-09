/** !! THIS CODE GENERATE BY ALLY !! **/

/*
Jangan Hapus Wm Bang 

*Send Mail  Plugins Esm*

Entah Yang Punya Web Nya Link CH nya Mana Gak Ketemu Yang Ada Bisa Bagi 

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*

Shannz
*/

const axios = require('axios');

async function lemonmail(target, subject, message) {
    const data = JSON.stringify({
        "to": target,
        "subject": subject,
        "message": message
    });

    const config = {
        method: 'POST',
        url: 'https://lemon-email.vercel.app/send-email',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
            'Content-Type': 'application/json',
            'sec-ch-ua-platform': '"Android"',
            'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            'sec-ch-ua-mobile': '?1',
            'origin': 'https://lemon-email.vercel.app',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://lemon-email.vercel.app/',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'priority': 'u=1, i'
        },
        data: data
    };

    const api = await axios.request(config);
    return api.data;
}

const handler = async (m, {text}) => {
    if (!text) return m.reply('*Example :* .lemonmail omkegas@mail.com|Subjek Email|Pesan');
    
    const [target, subject, ...messageParts] = text.split('|');
    if (!target || !subject || !messageParts.length) return m.reply('Yang Bener Donk Formatnya');
    
    const message = messageParts.join('|');
    
    try {
        const result = await lemonmail(target.trim(), subject.trim(), message.trim());
        m.reply(`Pesan E-Mail Berhasil Dikrikm`);
    } catch (error) {
        m.reply(`${error.response?.data || error.message}`);
    }
};

handler.help = ['sendmail'];
handler.command = ['sendmail'];
handler.tags = ['tools'];

module.exports = handler;