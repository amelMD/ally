/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let axios = require('axios')

let handler = async (m, { usedPrefix, command, conn, args }) => {

let text = 'cewe cantik'
try {
m.react('🕒')
const response = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    const results = response.data.resource_response.data.results;
    if (results && results.length > 0) {
      const imageUrls = results.map(v => v.images.orig.url).filter(url => url);
      if (imageUrls.length === 0) {
        throw `Tidak ada gambar yang ditemukan untuk "${text}".`;
      }
        await conn.sendFile(m.chat, pickRandom(imageUrls), 'pinterest_image.jpg', '', m);
    } else {
      throw `Tidak ada hasil yang ditemukan untuk "${text}".`;
    }
  } catch (error) {
    console.error("Pinterest image retrieval error:", error);
    throw `Gagal mengambil gambar dari Pinterest untuk "${text}".`;
  }
};
handler.help = ['cecan'];
handler.tags = ['internet'];
handler.command = /^(cecan)$/i
module.exports = handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}