/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let { googleImage } = require('@bochilteam/scraper')
var handler = async (m, { conn, text, usedPrefix, command }) => {
     let waluh = /adult|anal|ass|bahenol|bersetubuh|boke(b|p)|bdsm|bikini|(blow|hand|titt?s?) ?-?job|bondage|boobs?|breast|butt|climax|coli|crot|cum|cream ?-?pie|desah|dick|entot|ero|ewe|fem(boy|dom)|fetish|fingering|foreplay|fuck|furry|gang ?bang|gay|gey|(boruto|hinata|naruto|raikage) ?-?x|hh?h?e?e?e?nn?n?tt?t?aa?a?(e|i|o|u)|hardcore|horn(i|y)|kontol|jemb(o|u)t|jerk|kelamin|klimak|kontol|lacur|pusy|lesbi|lewd|lick|loco|mating|making love|masturba|memek|milf|moan|montok|naked|nekopoi|nggama|nipp?les?|nud(e|ity)|nsfw|oppai|oral|orgas(me|ms?)|orgy|panty|pee|pe?ler|penetra(s|t)|pornhub|porno?|prostitu|pussy|puting|rape|roleplay|rough|sex|sionar(i|y)|seduc|slut|sperm|squirt|suck|swinger|telanjang|tiddies?|tits?|toket|toples|underwear|vagina|virgin|whore|xhamster|xnxx|xxx|yiff/.test(text.toLowerCase().replace(/0/g,'o').replace(/1/g,'i').replace(/3/g,'e').replace(/4/g,'a').replace(/5/g,'s').replace(/8/g,'b').replace(/9/g,'g').replace(/[267]/g,'e'))
    if (db.data.chats[m.chat].nsfw == false && m.isGroup && waluh) return m.reply(status.nsfw)
    if (!text) throw `*example:* .${command} epep`
    const res = await googleImage(text)
    conn.sendMessage(m.chat, {
		react: {
			text: '🕑',
			key: m.key,
		}
	})
    let old = new Date()
    let image = res[Math.floor(Math.random() * res.length)];
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg',  `*${xl} G O O G L E - I M A G E*\n\n• *Keyword:* ${text}\n• *Fetching:* ${(new Date - old) * 1} seconds`,m)
}
handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i
handler.register = false
handler.premium = false
handler.limit = true

module.exports = handler