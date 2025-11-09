/** !! THIS CODE GENERATE BY ALLY !! **/

/*
By Putramodz/Mputz
Don't Delete This Wm:)
My Group: https://chat.whatsapp.com/Gl5ALz9UkSOFHzJFRqdgd2
*/

const fs = require('fs')
const path = require('path')

let Amelia = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply('Masukkan path folder yang berisi file .js!\nContoh: ./plugins');
    }

    const folderPath = args[0]; 
    const watermark = `/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT, MPUTZ (PUYRAMODZ), ZALS !! **/\n\n`; // ubah sesuai keinginan mu le wm nya

    const oldNames = [/handler/g]; 
    const newName = 'rodotz'; //ganti nama mu le

    try {
        const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return m.reply(`Tidak ada file .js yang ditemukan di folder: ${folderPath}`);
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            let data = fs.readFileSync(filePath, 'utf8');

            let updatedData = data.replace(/\/\*[\s\S]*?\*\//g, ''); 
            oldNames.forEach(oldName => {
                updatedData = updatedData.replace(oldName, newName); 
            });
            updatedData = updatedData.trimStart(); 

            const finalData = watermark + updatedData;

            fs.writeFileSync(filePath, finalData, 'utf8');
        });

        m.reply(`Berhasil memperbarui ${files.length} file di folder: ${folderPath}`);
    } catch (err) {
        console.error(err);
        m.reply(`Terjadi kesalahan: ${err.message}`);
    }
};

Amelia.help = ['replacewm <folderPath>'];
Amelia.tags = ['tools'];
Amelia.command = /^replacewm$/i;
Amelia.owner = true

module.exports = Amelia