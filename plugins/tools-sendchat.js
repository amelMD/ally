/** !! THIS CODE GENERATE BY ALLY !! **/

let replyMapping = {};

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`Please provide destination number and message!\n\n*Example*:\n- ${usedPrefix + command} 62xxxxxxxxxxx Halo, apa kabarmu`);
    let [number, ...messageParts] = text.split(' ');
    let message = messageParts.join(' ');

    if (!number || !message) return m.reply("Make sure you include the number and message.");

    number = number.replace(/\D/g, '');
    if (!number.endsWith('@s.whatsapp.net')) {
        number += '@s.whatsapp.net';
    }

    try {
        await conn.sendMessage(number, { text: message });

        replyMapping[number] = m.sender;

        m.reply(`Success, message sent to ${number.replace('@s.whatsapp.net', '')}.`);
    } catch (error) {
        console.error('Error while sending message:', error);
        m.reply(`Failed to send message to: ${number.replace('@s.whatsapp.net', '')}.`);
    }
};

handler.help = handler.command = ['sendchat'];
handler.tags = ['tools'];

module.exports = handler;

conn.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        let message = chatUpdate.messages[0];
        if (!message.message || message.key.fromMe) return;

        let sender = message.key.remoteJid;
        if (replyMapping[sender]) {
            let originalUser = replyMapping[sender];
            let textMessage = message.message.conversation || 
                              message.message.extendedTextMessage?.text || 
                              "Message not supported";

            await conn.sendMessage(originalUser, { text: `Reply from ${sender.replace('@s.whatsapp.net', '')}:\n\n${textMessage}` });
        }
    } catch (error) {
        console.error('Error while forwarding reply:', error);
    }
});