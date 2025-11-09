/** !! THIS CODE GENERATE BY ALLY !! **/

//   ➠ Ini Weem Bwanh
//   ➠ Created By Radit
//   ➠ Jangan di hapus bg :(
let handler = async(m) => {
	
	if (!m.quoted) return conn.reply(m.chat, `Reply Pesan dari channel!`, m);
	try {
		let getInfo = await m.getQuotedObj().msg.contextInfo.forwardedNewsletterMessageInfo
		let caption = `*ID CHANNEL ${getInfo.newsletterName || "Not Known"}*\n\n*Nama:* ${getInfo.newsletterName || "Not Known"}\n*ID*: ${getInfo.newsletterJid || "Not Known"}\n`;
		
		await conn.reply(m.chat, caption, m)
	} catch {
		m.reply("Pesan Tidak Valid!\nGunakan Pesan Yang Berasal Dari Channel dan Fresh!")
	}
}
handler.help = ["getidch"];
handler.tags = ["tools"];
handler.command = /^(getidch|ci)$/i;

module.exports = handler