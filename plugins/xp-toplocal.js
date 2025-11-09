/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

function formatNumber(balance) {
  const suffixes = ['', 'k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n', 'd', 'U', 'D', 'Td', 'qd', 'Qd', 'sd', 'Sd', 'od', 'nd', 'V', 'Uv', 'Dv', 'Tv', 'qv', 'Qv', 'sv', 'Sv', 'ov', 'nv', 'T', 'UT', 'DT', 'TT', 'qt', 'QT', 'st', 'ST', 'ot', 'nt'];
  const suffixIndex = Math.floor(Math.log10(balance) / 3);
  const suffix = suffixes[suffixIndex];
  const scaledBalance = balance / Math.pow(10, suffixIndex * 3);
  return scaledBalance.toFixed(2) + suffix;
}

let handler = async (m, { conn, participants }) => {

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  let member = participants.map(u => u.id);
  let kontol = {};
  for (let i = 0; i < member.length; i++) {
    if (typeof global.db.data.users[member[i]] != 'undefined' && member[i] != conn.user.jid && member[i] != conn.user.jid.split('@')[0] + '@s.whatsapp.net') {
      kontol[member[i]] = {
        money: global.db.data.users[member[i]].money,
        level: global.db.data.users[member[i]].level,
        limit: global.db.data.users[member[i]].limit
      };
    }
  }
  let money = Object.entries(kontol).sort((a, b) => b[1].money - a[1].money);
  let limit = Object.entries(kontol).sort((a, b) => b[1].limit - a[1].limit);
  let rankbalance = money.map(v => v[0]);
  let rankLimit = limit.map(v => v[0]);
  let isbalance = Math.min(10, money.length);
  let isLimit = Math.min(10, limit.length);
  let teks = `*[ 🚩 ] T O P - L O C A L*\n`;
  teks += `*[ 🏆 ] You : ${rankbalance.indexOf(m.sender) + 1}* of *${member.length}*\n`;
  teks += `*[ 🔥 ] Group : ${await conn.getName(m.chat)}*\n\n`;
  teks += money.slice(0, isbalance).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + '\n   ◦  *Balance : ' + formatNumber(data.money) + '*\n   ◦  *Level️ : ' + data.level + '*').join('\n');
  teks += `\n\n${global.set.footer}`;
  m.reply(teks);
};

handler.command = /^toplokal|toplocal$/i;
handler.tags = ["xp"];
handler.help = ["toplocal"];
handler.register = true;
handler.group = true;

module.exports = handler;