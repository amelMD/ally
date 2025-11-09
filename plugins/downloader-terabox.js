/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');
/*
• FITUR CRETAED BY PUTRAMODZ 
• SCRAPER SANJAYA
• NOTE INI MAKS NYA HANYA 300 MB!
*/
function formatNumber(number) {
  if (number >= 1024 * 1024 * 1024 * 1024) return (number / (1024 * 1024 * 1024 * 1024)).toFixed(1).replace(/\.0$/, '') + ' TB';
  if (number >= 1024 * 1024 * 1024) return (number / (1024 * 1024 * 1024)).toFixed(1).replace(/\.0$/, '') + ' GB';
  if (number >= 1024 * 1024) return (number / (1024 * 1024)).toFixed(1).replace(/\.0$/, '') + ' MB';
  if (number >= 1024) return (number / 1024).toFixed(1).replace(/\.0$/, '') + ' KB';
  return number.toString();
}

const terabox = {
  metadata: async (url) => {
    let surl;
    const parsedUrl = new URL(url);
    const pathSegments = parsedUrl.pathname.split('/');
    if (pathSegments[1] === 's') {
      surl = pathSegments[2];
    } else {
      surl = parsedUrl.searchParams.get('surl');
    }

    const config = {
      method: 'GET',
      url: `https://terabox.hnn.workers.dev/api/get-info?shorturl=${surl}&pwd=`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'accept-language': 'id-ID',
        'referer': 'https://terabox.hnn.workers.dev/',
      },
    };

    const api = await axios.request(config);
    return api.data;
  },

  getUrl: async (mdat, fs_id) => {
    const data = JSON.stringify({
      shareid: mdat.shareid,
      uk: mdat.uk,
      sign: mdat.sign,
      timestamp: mdat.timestamp,
      fs_id: fs_id,
    });

    const config = {
      method: 'POST',
      url: 'https://terabox.hnn.workers.dev/api/get-download',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'Content-Type': 'application/json',
        'accept-language': 'id-ID',
      },
      data: data,
    };

    const api = await axios.request(config);
    return api.data.downloadLink;
  },
};

const handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.sendMessage(m.chat, { text: 'Kirimkan link Terabox untuk mendownload file.\n\n*NOTE: Maks 300 MB*' }, { quoted: m });
  }

  const url = text.trim();
  const metadata = await terabox.metadata(url);

  if (!metadata || !metadata.list || metadata.list.length === 0) {
    return conn.sendMessage(m.chat, { text: 'Gagal mengambil daftar file dari URL yang diberikan.' }, { quoted: m });
  }

  let responseText = `📁 *Daftar File Terabox:*\n`;
  metadata.list.forEach((file, index) => {
    responseText += `*${index + 1}.* ${file.filename} | ${formatNumber(file.size)}\n`;
  });
  responseText += '\n📌 *Balas pesan ini dengan nomor file yang ingin diunduh.*';

  const { key } = await conn.reply(m.chat, responseText, m);
  conn.terabox = conn.terabox || {};
  conn.terabox[m.sender] = { metadata, key };

  handler.before = async (m, { conn }) => {
    if (!conn.terabox[m.sender]) return;

    const { metadata, key } = conn.terabox[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

    const choice = Number(m.text.trim());
    if (choice < 1 || choice > metadata.list.length) {
      return conn.reply(m.chat, '❗ Nomor tidak valid. Pilih sesuai daftar.', m);
    }
    m.react("🕛")

    conn.sendMessage(m.chat, { delete: key });
    delete conn.terabox[m.sender];

    const selectedFile = metadata.list[choice - 1];
    const downloadUrl = await terabox.getUrl(metadata, selectedFile.fs_id);

    if (downloadUrl) {
      try {
        const videoBuffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
        const caption = `📁 *Detail File:*\n∘ *Nama:* ${selectedFile.filename}\n∘ *Ukuran:* ${formatNumber(selectedFile.size)}\n∘ *Link Unduh:* ${downloadUrl}`;

        await conn.sendMessage(m.chat, { video: videoBuffer.data, caption }, { quoted: m });
      } catch (error) {
        conn.reply(m.chat, '⚠️ Gagal mengunduh file. Coba lagi nanti.', m);
        console.error(error);
      }
    } else {
      conn.reply(m.chat, '⚠️ Gagal mendapatkan link unduhan.', m);
    }
  };
};

handler.help = ['teraboxdl', 'teradl'].map(v => v + ' *[url]*');
handler.tags = ['downloader'];
handler.command = /^(teraboxdl|teradl|terabox)$/i;
handler.limit = 5

module.exports = handler;