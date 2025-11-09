/** !! THIS CODE GENERATE BY ALLY !! **/

const crypto = require('crypto');
const fetch = require('node-fetch');

const sendMessage = async (username, message, spamCount) => {
    let counter = 0;

    while (counter < spamCount) {
        try {
            const date = new Date();
            const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
            const deviceId = crypto.randomBytes(21).toString('hex');
            const url = 'https://ngl.link/api/submit';

            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Referer': `https://ngl.link/${username}`,
                'Origin': 'https://ngl.link'
            };

            const body = `username=${username}&question=${message}&deviceId=${deviceId}&gameSlug=&referrer=`;

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body,
                mode: 'cors',
                credentials: 'include'
            });

            if (response.status !== 200) {
                console.log(`[${formattedDate}] [Err] Rate limited`);
                await new Promise(resolve => setTimeout(resolve, 25000));
            } else {
                counter++;
                console.log(`[${formattedDate}] [Msg] Sent: ${counter}`);
            }
        } catch (error) {
            console.error(`[${formattedDate}] [Err] ${error}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

const handler = async (m, { text, usedPrefix, command }) => {
    const [username, message, count] = text.split("+");

    if (!username || !message || !count) {
        return m.reply(`Please provide the username from ngl.link!\n\n*Example*:\n- ${usedPrefix + command} AgungDEV+Hello+5\n\nExample link (https://ngl.link/AgungDEV) take the username part, namely AgungDEV.`);
    }
    /** React Process **/
    m.react(set.react);
    

    const spamCount = parseInt(count, 10);
    if (isNaN(spamCount) || spamCount <= 0) {
        return m.reply("The number of messages must be a positive number.");
    }

    try {
        await sendMessage(username, message, spamCount);
        m.reply(`Successfully sent *${spamCount}* NGL messages to: *${username}*`);
    } catch (e) {
        console.error(e);
        m.reply(`Failed to execute ${command} command\nError: _${e.message}_`);
    }
};

handler.help = handler.command = ["nglspam"];
handler.tags = ["tools"];
handler.limit = 50;
handler.premium = true;

module.exports = handler;