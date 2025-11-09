/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, {
    image: { url: 'https://img.randme.me/' },
    caption: '*Random Meme*'
  }, { quoted: m });
};

handler.help = ['memeluar'];
handler.command = ['memeluar'];
handler.tags = ['fun'];

module.exports = handler;