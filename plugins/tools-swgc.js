/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

const { STORIES_JID, generateWAMessage } = require('@whiskeysockets/baileys');
const fetchParticipants = async (conn, ...jids) => {
  let results = [];
  for (const jid of jids) {
    let { participants } = await conn.groupMetadata(jid);
    participants = participants.map(({ id }) => id);
    results = results.concat(participants);
  }
  return results;
};

const sendStatusMentions = async (conn, jids, content) => {
  const msg = await generateWAMessage(STORIES_JID, content, {
    upload: conn.waUploadToServer,
  });

  let statusJidList = [];
  for (const _jid of jids) {
    if (_jid.endsWith('@g.us')) {
      for (const jid of await fetchParticipants(conn, _jid)) {
        statusJidList.push(jid);
      }
    } else {
      statusJidList.push(_jid);
    }
  }
  statusJidList = [...new Set(statusJidList)];

  await conn.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id,
    statusJidList,
    additionalNodes: [
      {
        tag: 'meta',
        attrs: {},
        content: [
          {
            tag: 'mentioned_users',
            attrs: {},
            content: jids.map((jid) => ({
              tag: 'to',
              attrs: {
                jid,
              },
              content: undefined,
            })),
          },
        ],
      },
    ],
  });

  for (const jid of jids) {
    let type = jid.endsWith('@g.us')
      ? 'groupStatusMentionMessage'
      : 'statusMentionMessage';

    await conn.relayMessage(
      jid,
      {
        [type]: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: 'meta',
            attrs: {
              is_status_mention: 'true',
            },
            content: undefined,
          },
        ],
      }
    );
  }

  return msg;
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const args = text.trim().split(' ');
  const option = args[0];
  const contentText = args.slice(1).join(' ');

  if (command === 'swgc' && !option) {
    return m.reply(
      `Silakan pilih opsi berikut:\n\n` +
      `1. *${usedPrefix}swgc -text* - Kirim teks sebagai status mention\n` +
      `2. *${usedPrefix}swgc -image* - Kirim gambar sebagai status mention\n` +
      `3. *${usedPrefix}swgc -video* - Kirim video sebagai status mention\n` +
      `4. *${usedPrefix}swgc -audio* - Kirim audio sebagai status mention\n\n` +
      `Gunakan perintah sesuai kebutuhan.`
    );
  }

  let type, content;

  if (option === '-text') {
    type = 'text';
    content = {
      text: contentText || (m.quoted && m.quoted.text) || 'Ini adalah status mention default',
    };
  } else if (option === '-image') {
    if (!m.quoted) throw 'Reply ke pesan gambar untuk mengirim status!';
    type = 'image';
    content = {
      image: await m.quoted.download(),
      caption: contentText || m.quoted.text || '',
    };
  } else if (option === '-video') {
    if (!m.quoted) throw 'Reply ke pesan video untuk mengirim status!';
    type = 'video';
    content = {
      video: await m.quoted.download(),
      caption: contentText || m.quoted.text || '',
    };
  } else if (option === '-audio') {
    if (!m.quoted) throw 'Reply ke pesan audio untuk mengirim status!';
    type = 'audio';
    content = {
      audio: await m.quoted.download(),
      ptt: true,
    };
  } else {
    throw `Gunakan perintah yang benar:\n\n` +
      `1. *${usedPrefix}swgc -text [teks]*\n` +
      `2. *${usedPrefix}swgc -image* (reply ke gambar)\n` +
      `3. *${usedPrefix}swgc -video* (reply ke video)\n` +
      `4. *${usedPrefix}swgc -audio* (reply ke audio)`;
  }

  const result = await sendStatusMentions(conn, [m.chat], content);
  m.reply(`Status ${type} berhasil dikirim!`);
  return result;
};

handler.help = ['swgc', 'swgc -text', 'swgc -image', 'swgc -video', 'swgc -audio'];
handler.owner = true
handler.tags = ['tools'];
handler.command = ['swgc'];

module.exports = handler;