/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `masukkan teks`
  let type = (args[0] || '').toLowerCase()
  switch (type) {
    case "handler": 
      let code = '```CommonJS\nlet rodotz = async (m, { conn, text, usedPrefix, command }) => {\n  // Kode Anda\n}\nrodotz.help = ["help"]\nrodotz.tags = ["tags menu"]\nrodotz.command = ["command"]\nmodule.exports = rodotz```'
      let key = await m.reply("Contoh plugins jenis handler: ")
      await conn.reply(m.chat, code, key)
      break 
    default:
      if (!/[01]/.test(command)) return m.reply("Tidak valid")
  }
}
handler.command = handler.help = ["example"]
handler.tags = ['tools']
module.exports = handler