/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let { robloxInfo } = require('../lib/scraper/robloxstalk') 

let handler = async (m, {
    command,
    text,
    conn,
    usedPrefix
}) => {
    if (!text) throw 'Masukkan Username\n\nExample:' + usedPrefix + command + ' Jackgans_gaming';

    try {
         conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
        let res = await robloxInfo(text);
        if (!res) throw res;
        let capt = `*${layout.xl} R O B L O X - S T A L K*

     • 👤 *Name:* ${res.userDetails.name}
     • 👤 *Display:* ${res.userDetails.displayName}
     • 📃 *Description:* ${res.userDetails.description}
     • 🆔 *ID:* ${res.userDetails.id}
     • 🛠️ *Created:* ${res.userDetails.created}
     • ✅ *Verified:* ${res.userDetails.hasVerifiedBadge}
     • ❎ *IsBanned:* ${res.userDetails.isBanned}
     • 🕒 *Last Online:* ${res.lastOnline}`

conn.sendFile(m.chat, res.profileDetails, 'image.jpg', capt, m)
    } catch (e) {
        conn.reply(m.chat, 'Error. Terjadi kesalahan 😔', m);
    }
};

handler.help = ['rblxstalk','robloxstalk','stalkrblx'];
handler.tags = ['stalk'];
handler.alias = ['robloxstalk', 'stalkrblx'];
handler.command = /^(rblxstalk|robloxstalk|stalkrblx)$/i;

module.exports = handler;