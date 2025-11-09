/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn, groupMetadata}) => {
const imtro = `
⧁━━━━━━✦✧✦━━━━━━⧁
** 〜 ${groupMetadata.subject} 〜**
“Suara adalah jiwa yang terdengar.”
⧁━━━━━━✦✧✦━━━━━━⧁

◇ Nama :
◇ Askot :
◇ Umur:
◇ Kelas:
◇ Gender:
◇ Alasan gabung :
◇ Anime favorit :
◇ Hobi:
◇ Quotes / Motto pribadi :
◇ Pesan Singkat=


⧁━━━━━━✦✧✦━━━━━━⧁
– The voice is the sound of the soul –
━━━━━━✦✧✦━━━━━
`
m.reply(imtro) 
};
handler.help = ['intro'].map(v => v + ' <identifikas>');
handler.tags = ['group'];
handler.command = /^(intro)$/i;
handler.group = true;
module.exports = handler;