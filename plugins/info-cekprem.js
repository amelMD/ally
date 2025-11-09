/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, {conn}) => {
function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		// +minutes+":"+sec;
  }
let premium = global.db.data.users[m.sender].premium
if (premium == true)  {
conn.reply(m.chat, `✅ *[ KAMU USER PREMIUM ]*\nSelama : ${msToDate(global.db.data.users[m.sender].premiumDate - new Date() * 1)}`, m)
} else conn.reply(m.chat, '❎ *[ KAMU BUKAN USER PREMIUM ]*',m)
} 
handler.command = /^(cekprem|cekpremium)$/i
module.exports = handler