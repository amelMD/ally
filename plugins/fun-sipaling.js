/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

var handler = async (m, {
	conn,
	text,
	participants,
	usedPrefix
}) => {
	if (!text) throw `contoh:\n${usedPrefix}paling cantik`
	var member = participants.map(u => u.id)
	var cakep = member[Math.floor(Math.random() * member.length)]
	var jawab = `Sipaling ${text} disini adalah @${cakep.replace(/@.+/, '')}`.trim()
	var mentions = [cakep]
	conn.reply(m.chat, jawab, m, {
		mentions
	})
}
handler.help = ['sipaling <teks>']
handler.tags = ['fun']
handler.command = /^(sipaling)$/i
handler.group = true

module.exports = handler