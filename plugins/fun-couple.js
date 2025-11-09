/** !! THIS CODE GENERATE BY ALLY !! **/

let moment = require("moment-timezone")

let rodotz = async (m, { conn, text, usedPrefix, command, participants }) => {
      let member = participants.map(u => u.id)
      let now = new Date * 1
      var tag1 = member[Math.floor(member.length * Math.random())]
      var tag2 = member[Math.floor(member.length * Math.random())]
      if (tag1 == tag2) {
         for (let i = 0; i < 5; i++) {
            var tag1 = member[Math.floor(member.length * Math.random())]
            var tag2 = member[Math.floor(member.length * Math.random())]
            if (tag1 != tag2) {
               break
            }
         }
      }
      conn.reply(m.chat, `Random Best Couple : @${tag1.replace(/@.+/, '')} 💞 @${tag2.replace(/@.+/, '')}, New couple of the day may be chosen at _${moment(now).format('DD/MM/YYYY HH:mm')}._`)
}
rodotz.help = ["couple"]
rodotz.tags = ["group", "fun"]
rodotz.command = ["couple"]
rodotz.group = true
module.exports = rodotz