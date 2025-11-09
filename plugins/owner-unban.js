/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? (text.replace(/[^0-9]/g, '')) + '@s.whatsapp.net' : false
    else who = text ? (text.replace(/[^0-9]/g, '')) + '@s.whatsapp.net' : m.chat
    if (!who) throw 'Tag salah satu orang'
    const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${who.split('@')[0]}:${who.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
    let users = global.db.data.users
    if (users[who].banned == false) throw `_Nomor ${m.isGroup ? 'itu' : 'ini'} aman_`
    users[who].banned = false
    conn.reply(m.chat, `_*Berhasil unban*_\nBot akan merespon nomor tersebut`, m)
conn.reply(who, `Kamu Telah Di Unbanned oleh Owner`, fkontak)
}
handler.help = ['unban']
handler.tags = ['owner']
handler.command = /^unban$/i
handler.owner = true

module.exports = handler