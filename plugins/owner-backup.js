/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let fs = require('fs');
let archiver = require('archiver');
let { exec } = require('child_process');

let handler = async (m, { conn }) => {
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  const foldersToExclude = [
    'node_modules',
    '.npm',
    '.cache',
    'Ally-Sessions'
  ];

  const timestamp = new Date().toISOString();
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const backupFileName = `rodots-backup_${formattedDate}.zip`;

  const output = fs.createWriteStream(backupFileName);
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on('error', err => {
    throw err;
  });

  archive.pipe(output);

  const processDir = (dir, parentDir = '') => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = parentDir ? `${parentDir}/${file}` : file;
      const fullFilePath = `${dir}/${file}`;
      if (fs.lstatSync(fullFilePath).isDirectory()) {
        if (!foldersToExclude.some(folder => filePath.startsWith(folder))) {
          processDir(fullFilePath, filePath);
        }
      } else {
        archive.file(fullFilePath, { name: filePath });
      }
    }
  };

  processDir('.');

  archive.finalize();

  output.on('close', () => {
    const stats = fs.statSync(backupFileName);
    const fileSize = `${(stats.size / (1024 * 1024)).toFixed(2)} MB`;

    const description = `Successfully backed up bot files\n\n` +
      `• *File Size :* ${fileSize}\n` +
      `• *Backup Date :* ${formattedDate}`;

    conn.sendFile(global.own.no + '@s.whatsapp.net', backupFileName, backupFileName, description);
    fs.unlinkSync(backupFileName); 
   m.reply('Berhasil Terkirim ke Nomor Owner!')
  });
};

handler.help = ['backup'];
handler.tags = ['owner'];
handler.rowner = true;
handler.command = /^(backup)$/i;

module.exports = handler;