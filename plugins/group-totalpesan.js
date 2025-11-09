/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn }) => {
    const messages = conn.chats[m.chat]?.messages || {}
    const participantCounts = {}
    Object.values(messages).forEach(({ key }) => {
        const participant = key.participant || key.remoteJid
        if (participant) {
            participantCounts[participant] = (participantCounts[participant] || 0) + 1
        }
    })   
    const sortedData = Object.entries(participantCounts)
        .sort((a, b) => b[1] - a[1])  
    const totalMessages = sortedData.reduce((acc, [, total]) => acc + total, 0)
    const totalParticipants = sortedData.length
      const pesan = sortedData
        .map(([jid, total], index) => 
            `- @${jid.split('@')[0]}: *${total}*`)
        .join('\n')
    await m.reply(
        `*\`📊 Total Group Messages\`*\n` +
        `> *Messages:* ${totalMessages}\n` +
        `> *Total tags:* ${totalParticipants}\n\n` +
        pesan,
        null,
        {
            contextInfo: {
                mentionedJid: sortedData.map(([jid]) => jid)
            }
        }
    )
}

handler.help = ["totalpesan", "totalchat"]
handler.tags = ["group"]
handler.command = /^(totalpesan|totalchat)$/i
handler.group = true

module.exports = handler