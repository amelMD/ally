let { WAMessageStubType } = require("@whiskeysockets/baileys");
let urlRegex = require("url-regex-safe")({ strict: false });
let PhoneNumber = require("awesome-phonenumber");
let terminalImage = global.opts["img"] ? require("terminal-image") : "";
let chalk = require("chalk");
let fs = require("fs");

module.exports = async function (m, conn, isBotAdmin = { user: {} }) {
  class ClearLogger {
    logCount = 0;
    addLog = () => ((this.logCount >= 999) && this.clearLogs(), this.logCount++);
    clearLogs = () => (console.log(chalk.blue("Clearing log...")) && console.clear(), this.logCount = 0);
  }

  const clearLoggerInstance = new ClearLogger();
  let _name = await conn.getName(m.sender);
  let sender = PhoneNumber("+" + m.sender.replace("@s.whatsapp.net", "")).getNumber("international") + (_name ? " ~" + _name : "");
  let chat = await conn.getName(m.chat);
  
  let filesize = (m.msg?.fileLength?.low || m.msg?.fileLength || m.text?.length || 0) || 0;
  let user = global.DATABASE.data.users[m.sender];
  let me = PhoneNumber("+" + (conn.user && conn.user.jid).replace("@s.whatsapp.net", "")).getNumber("international");

  let logHeader = chalk.bold.blue("╔════════════════════════════════════════╗");
  let logFooter = chalk.bold.blue("╚════════════════════════════════════════╝");

  let logBody = `
${chalk.bold.blue("║")} ${chalk.bold.white("📩 MESSAGE LOG")}
${chalk.bold.blue("║────────────────────────────────────────")}
${chalk.bold.blue("║")} ${chalk.bold.white("👤 SENDER   :")} ${chalk.magenta(sender)}
${chalk.bold.blue("║")} ${chalk.bold.white("💬 CHAT     :")} ${chalk.yellow(chat)}
${chalk.bold.blue("║")} ${chalk.bold.white("📦 FILESIZE :")} ${chalk.cyan(filesize + " B")}
${chalk.bold.blue("║")} ${chalk.bold.white("⏰ TIMESTAMP :")} ${chalk.green(
    m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)).toTimeString() : new Date().toTimeString()
  )}
${chalk.bold.blue("║")} ${chalk.bold.white("📌 MESSAGE TYPE :")} ${chalk.blue(m.mtype || "N/A")}
${chalk.bold.blue("║────────────────────────────────────────")}
${chalk.bold.blue("║")} ${chalk.bold.white("📢 COMMAND :")} ${m.isCommand ? chalk.green.bold(m.text) : chalk.white(m.text)}
${chalk.bold.blue("║────────────────────────────────────────")}
${chalk.bold.blue("║")} ${chalk.bgBlack.white.bold("• SCRIPT ALYY BY AMEL •")}
  `;

  console.log(`${logHeader}\n${logBody}\n${logFooter}`);

  if (global.opts["img"]) {
    try {
      if (/sticker|image/gi.test(m.mtype)) {
        let img = await terminalImage.buffer(await m.download());
        console.log(img.trimEnd());
      }
    } catch (e) {
      console.error(e);
    }
  }

 /** if ((opts["antibot"] || (global.db.data.chats[m.chat].antiBot && m?.isGroup && isBotAdmin)) && m?.sender) {
    clearLoggerInstance.addLog();
    const idBot = m.msg?.id || m.key.id || "N/A";
    if (["BAE5", "WA"].some((k) => idBot.includes(k) && m.sender !== conn.user.jid)) {
      await conn.sendMessage(m.chat, {
        text: "*🚨 ANTI-BOT DETECTED!*",
      });
      await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      conn.logger.info("Bot detected " + m.sender.split("@")[0]);
    }
  } **/

  console.log();
}; 

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.bgBlack.green.bold("• FILE UPDATED: lib/print.js •"));
  delete require.cache[file];
});