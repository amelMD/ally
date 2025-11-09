/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn, args }) => { 
    if (!args || !args[0]) throw 'Siapa yang mau di banned nih?'
    let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    if (!mention) throw 'Tag salah satu lah'
    if (!(mention in global.db.data.users)) throw 'User tidak terdaftar dalam DATABASE!!'
    const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${mention.split('@')[0]}:${mention.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
    let user = global.db.data.users[mention]
    if (user.banned) throw 'User telah terbanned!!'
    let txt = (args.length > 1 ? args.slice(1).join(' ') : 'Tanpa Alasan') || 'Tanpa Alasan' 
    user.banned = true 
    user.BannedReason = txt 
    m.reply('Berhasil Banned User!')
    conn.reply(mention, `Kamu Telah Di Banned oleh Owner\n\n*Reason* : ${txt ? `Dikarenakan ${txt}` : 'Tanpa Alasan...'}`, fkontak)
}

handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban(user)?$/i
handler.owner = true

module.exports = handler