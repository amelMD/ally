/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require("axios")

let handler = async (m, { args, command, conn }) => {
  let txt = args.join(" ");
  if (!txt) return m.reply("*Mana Prompt Nya*.")
  m.react("🐋")

  const parts = txt.split(" ");
  const isR1 = parts[0].toLowerCase() === "r1";

  let model = isR1 ? "deepseek-ai/DeepSeek-R1" : "deepseek-ai/DeepSeek-V3";
  let query = isR1 ? parts.slice(1).join(" ") : txt;

  if (!query) return m.reply("*Masuk Dalam Mode Deepthnik Mana Prompt Nya*'.");

  try {
    const response = await axios.post(
      "https://api.blackbox.ai/api/chat",
      {
        messages: [{ content: query, role: "user" }],
        model,
        max_tokens: "1024",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    let data = response.data;
    let cleanText = data.replace(/\*\*/g, "*").trim();

    /*let message = {
      image: { url: "https://files.catbox.moe/jgxtyn.jpg" },
      caption: cleanText,
    };

    await conn.sendMessage(m.chat, message)*/
    conn.sendMessage(m.chat, {
            text: cleanText,
            contextInfo: {
                externalAdReply: {
                    title: `ANSWER: ${txt}`,
                    body: '',
                    thumbnailUrl: 'https://files.catbox.moe/uvofak.jpg',
                    sourceUrl: 'https://www.deepseek.com/',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: m
        })
  } catch (error) {
    console.error(error);
    m.react("🐳")
  }
};
// ©Mputzz/PutraModz
handler.help = ["deepseek"];
handler.command = ["deepseek", "depsek", "deepsek", "depseek"];
handler.tags = ['ai']
handler.limit = true

module.exports = handler