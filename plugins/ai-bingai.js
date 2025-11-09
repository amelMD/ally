/** !! THIS CODE GENERATE BY ALLY !! **/

/*
*<>BING AI REALTIME, SUPPORT SESI UNTUK MENGINGAT PERCAKAPAN SEBELUMNYA<>*
SOURCE REST API: https://whatsapp.com/channel/0029VaG1DsA2kNFtAcwamK13/430
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
MINGGU, 08 NOVEMBER 01:19
*/
let fetch = require('node-fetch');
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
//https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
let undefined = {};
//https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Gunakan format:\n${usedPrefix + command} <pertanyaan>\n\nContoh:\n${usedPrefix + command} Apa itu AI?`;
m.react("🕘")
//weem https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  try {
    //wwwmmm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    if (undefined[m.sender]) {
      text = `${undefined[m.sender]}\n${text}`; 
    }
//https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    //wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    let url = `https://loco.web.id/wp-content/uploads/api/v1/bingai.php?q=${encodeURIComponent(text)}`;
    let response = await fetch(url);
//https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    if (!response.ok) throw 'Gagal menghubungi API. Silakan coba lagi nanti.';
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    let json = await response.json();
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    if (!json.status || !json.result || !json.result.ai_response) {
      throw 'Maaf, tidak ada hasil yang relevan untuk pertanyaan Anda.';
    }
//hapus=SDM rendah https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
   //https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    let aiResponse = json.result.ai_response.trim();
    let searchResults = json.result.search_results || [];
    let firstResult = searchResults[0]; 
//https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    let searchSummary = '';
    if (firstResult) {
      searchSummary = `**Hasil Pencarian:**\n${firstResult.title}\n[Link](${firstResult.url})`;
    } else {
      searchSummary = '';
    }
//https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
  undefined[m.sender] = text;
 //https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    let resultMessage = `*${aiResponse}\n\n${searchSummary}`;
//hapus=sdm rendah https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    m.reply(resultMessage);
  } catch (err) {
    console.error(err);
    m.reply('Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.');
  }
};
//https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
handler.help = ['bingai '];
handler.tags = ['internet'];
handler.command = /^bingai$/i; 
//hapus=mandul https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
module.exports = handler;
/*
*<>BING AI REALTIME, SUPPORT SESI UNTUK MENGINGAT PERCAKAPAN SEBELUMNYA<>*
SOURCE REST API: https://whatsapp.com/channel/0029VaG1DsA2kNFtAcwamK13/430
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
MINGGU, 08 NOVEMBER 01:19
*/