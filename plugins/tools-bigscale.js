/** !! THIS CODE GENERATE BY ALLY !! **/

/*
Jangan Hapus Wm Bang 

*Upscale/HD Plugins Esm*

Kayak Remini lah Tinggal Send Gambar aj Link Jga Bisaa

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*

https://whatsapp.com/channel/0029Vb5EZCjIiRotHCI1213L/186
*/

const axios = require('axios');
const FormData = require('form-data');

async function uploadImage(imageBuffer) {
    try {
        const form = new FormData();
        form.append('file', imageBuffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg'
        });

        const headers = {
            ...form.getHeaders(),
            'Content-Length': form.getLengthSync()
        };

        const response = await axios.post('https://www.pic.surf/upload.php', form, { headers });
        const identifier = response.data.identifier;

        return `https://www.pic.surf/${identifier}`;
    } catch (error) {
        throw new Error(`Upload gagal: ${error.response ? error.response.data : error.message}`);
    }
}

const bigjpg = {
  api: {
    base: 'https://bigjpg.com',
    endpoint: {
      task: '/task',
      free: '/free'
    }
  },

  available: {
    styles: {
      'art': 'Artwork',
      'photo': 'Foto'
    },
    noise: {
      '-1': 'Ninguno',
      '0': 'Bajo',
      '1': 'Medio',
      '2': 'Alto',
      '3': 'El más alto'
    }
  },

  headers: {
    'origin': 'https://bigjpg.com',
    'referer': 'https://bigjpg.com/',
    'user-agent': 'Postify/1.0.0',
    'x-requested-with': 'XMLHttpRequest'
  },

  isValid: (style, noise) => {
    if (!style && !noise) {
      return {
        valid: true,
        style: 'art',
        noise: '-1'
      };
    }

    if (style && !bigjpg.available.styles[style]) {
      return {
        valid: false,
        error: `Stylenya kagak valid bree.. Pilih salah satunya yak: ${Object.keys(bigjpg.available.styles).join(', ')}`
      };
    }

    if (noise && !bigjpg.available.noise[noise]) {
      return {
        valid: false,
        error: `Noise levelnya kagak valid bree.. Pilih salah satunya yak: ${Object.keys(bigjpg.available.noise).join(', ')}`
      };
    }

    return {
      valid: true,
      style: style || 'art',
      noise: noise || '-1'
    };
  },

  getImageInfo: async (img) => {
    if (!img) {
      return {
        valid: false,
        error: "Hadeh, gini bree... lu kasih link image nya yak. Jangan kosong begini"
      };
    }

    try {
      const response = await axios.get(img, {
        responseType: 'arraybuffer'
      });

      const fileSize = parseInt(response.headers['content-length'] || response.data.length);
      const width = Math.floor(Math.random() * (2000 - 800 + 1)) + 800;
      const height = Math.floor(Math.random() * (2000 - 800 + 1)) + 800;

      let fileName = img.split('/').pop().split('#')[0].split('?')[0] || 'image.jpg';
      if (fileName.endsWith('.webp')) {
        fileName = fileName.replace('.webp', '.jpg');
      }

      if (fileSize > 5 * 1024 * 1024) {
        return {
          valid: false,
          error: "Size imagenya kegedean bree.. Max 5MB yak"
        };
      }

      return {
        valid: true,
        info: {
          fileName,
          fileSize,
          width,
          height
        }
      };

    } catch (err) {
      return {
        valid: false,
        error: "Link imagenya error bree.. Coba link yang lain yak"
      };
    }
  },

  upscale: async (img, options = {}) => {
    const validation = await bigjpg.getImageInfo(img);
    if (!validation.valid) {
      return {
        success: false,
        code: 400,
        result: {
          error: validation.error
        }
      };
    }

    const inputx = bigjpg.isValid(options.style, options.noise);
    if (!inputx.valid) {
      return {
        success: false,
        code: 400,
        result: {
          error: inputx.error
        }
      };
    }

    const config = {
      x2: '2',
      style: inputx.style,
      noise: inputx.noise,
      file_name: validation.info.fileName,
      files_size: validation.info.fileSize,
      file_height: validation.info.height,
      file_width: validation.info.width,
      input: img
    };

    try {
      const params = new URLSearchParams();
      params.append('conf', JSON.stringify(config));

      const taskx = await axios.post(
        `${bigjpg.api.base}${bigjpg.api.endpoint.task}`,
        params,
        { headers: bigjpg.headers }
      );

      if (taskx.data.status !== 'ok') {
        return {
          success: false,
          code: 400,
          result: {
            error: "Error"
          }
        };
      }

      const taskId = taskx.data.info;
      let attempts = 0;
      const maxAttempts = 20;

      while (attempts < maxAttempts) {
        const res = await axios.get(
          `${bigjpg.api.base}${bigjpg.api.endpoint.free}?fids=${JSON.stringify([taskId])}`,
          { headers: bigjpg.headers }
        );

        const result = res.data[taskId];
        
        if (result[0] === 'success') {
          return {
            success: true,
            code: 200,
            result: {
              info: validation.info,
              url: result[1],
              size: result[2],
              config: {
                style: config.style,
                styleName: bigjpg.available.styles[config.style],
                noise: config.noise,
                noiseName: bigjpg.available.noise[config.noise]
              }
            }
          };
        } else if (result[0] === 'error') {
          return {
            success: false,
            code: 400,
            result: {
              error: "Upscalenya gagal bree.. Coba lagi nanti yak"
            }
          };
        }

        await new Promise(resolve => setTimeout(resolve, 15000));
        attempts++;
      }

      return {
        success: false,
        code: 400,
        result: {
          error: "Timeout"
        }
      };

    } catch (err) {
      return {
        success: false,
        code: 400,
        result: {
          error: err.message || "Error"
        }
      };
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'bigjpg') {
    let style, noise;
    
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (mime.startsWith('image')) {
      try {
        let media = await q.download();
        let imageUrl = await uploadImage(media);
        
        [style, noise] = text.split(' ');
        
        const result = await bigjpg.upscale(imageUrl, { style, noise });
        
        if (!result.success) {
          return m.reply(result.result.error);
        }
        
        const { info, url: resultUrl, size, config } = result.result;
        
        const caption = `*Hasil Upscale*\n\n*Nama File :* ${info.fileName}\n*Ukuran Asli :* ${(info.fileSize / 1024 / 1024).toFixed(2)} MB\n*Ukuran Hasil :* ${size}\n*Style :* ${config.styleName}\n*Noise Level :* ${config.noiseName}`;
        
        await conn.sendMessage(m.chat, {
          image: { url: resultUrl },
          caption: caption
        }, { quoted: m });
        
      } catch (error) {
        await conn.sendMessage(m.chat, { text: `${error.message}` }, { quoted: m });
      }
    } else {
      const [url, urlStyle, urlNoise] = text.split(' ');
      
      if (!url) {
        return m.reply(`Contoh penggunaan :\n1. *URL :* ${usedPrefix + command} <url_image> <style> <noise_level>\n2. *Gambar :* Reply gambar atau kirim gambar dengan caption ${usedPrefix + command} <style> <noise_level>\n\n*Available Styles :* ${Object.keys(bigjpg.available.styles).join(', ')}\n*Available Noise Levels :* ${Object.keys(bigjpg.available.noise).join(', ')}`);
      }
      
      const result = await bigjpg.upscale(url, { style: urlStyle, noise: urlNoise });
      
      if (!result.success) {
        return m.reply(result.result.error);
      }
      
      const { info, url: resultUrl, size, config } = result.result;
      
      const caption = `*Hasil Upscale*\n\n*File Name :* ${info.fileName}\n*Original Size :* ${(info.fileSize / 1024 / 1024).toFixed(2)} MB\n*Result Size :* ${size}\n*Style :* ${config.styleName}\n*Noise Level :* ${config.noiseName}`;
      
      await conn.sendMessage(m.chat, {
        image: { url: resultUrl },
        caption: caption
      }, { quoted: m });
    }
  } 
};

handler.help = ['bigjpg [style] [noise_level]'];
handler.tags = ['tools']
handler.command = ['bigjpg'];

module.exports = handler;