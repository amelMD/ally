/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios')
const cheerio = require('cheerio')
const qs = require('qs')

const tiksave = {
  getData: async (url) => {
    const apiUrl = 'https://tiksave.io/api/ajaxSearch';
    const data = qs.stringify({
      q: url,
      lang: 'id'
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'User-Agent': 'MyApp/1.0',
        'Referer': 'https://tiksave.io/en',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    try {
      const response = await axios.post(apiUrl, data, config);
      const html = response.data.data;
      const $ = cheerio.load(html);
      const downloadLinks = [];

      $('.dl-action a').each((index, element) => {
        const link = $(element).attr('href');
        const label = $(element).text().trim();
        downloadLinks.push({ label, link });
      });

      return downloadLinks;
    } catch (error) {
      console.error('Error:', error);
      return { success: false, message: error.message };
    }
  },
  download: async (url) => {
    try {
      const videoData = await tiksave.getData(url);
      if (videoData && videoData.length) {
        const hdVideoUrl = videoData.find(link => link.label === 'Unduh MP4 HD')?.link;

        return hdVideoUrl;
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, message: error.message };
    }
  }
};

let handler = async (m, { conn, text }) => {
  const url = text;
  if (!url) return conn.reply(m.chat, 'Please provide a TikTok URL to scrape.', m);
  
  try {
    const hdVideoUrl = await tiksave.download(url);
    if (!hdVideoUrl) {
      return conn.reply(m.chat, 'Sorry, HD video link not available for this video.', m);
    }

    const title = `*DONE HD VERSION*\n\n> ${set.footer}` 
    await conn.sendMessage(m.chat, { video: { url: hdVideoUrl }, caption: title }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    conn.reply(m.chat, 'Sorry, there was an error while fetching the video data.', m);
  }
};

handler.help = handler.command = ['tiktokhd', 'tthd', 'dltiktokhd']
handler.tags = ['downloader']
handler.limit = true

module.exports = handler