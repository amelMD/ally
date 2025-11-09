/** !! THIS CODE GENERATE BY ALLY !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
switch(command) {
case 'tosunda': {
   if (!text) return m.reply("Example: .tosunda hann")

const latinToSundanese = {
  'a': 'ᮅ',
  'b': 'ᮘ',
  'c': 'ᮎ',
  'd': 'ᮓ',
  'e': 'ᮌ',
  'f': 'ᮕ',
  'g': 'ᮎ',
  'h': 'ᮠ',
  'i': 'ᮄ',
  'j': 'ᮏ',
  'k': 'ᮊ',
  'l': 'ᮜ',
  'm': 'ᮙ',
  'n': 'ᮔ',
  'o': 'ᮇ',
  'p': 'ᮕ',
  'q': 'ᮃ',
  'r': 'ᮛ',
  's': 'ᮞ',
  't': 'ᮒ',
  'u': 'ᮅ',
  'v': 'ᮗ',
  'w': 'ᮝ',
  'x': 'ᮞ',
  'y': 'ᮌ',
  'z': 'ᮚ',
  ' ': ' '
};

async function convertToSundanese(text) {
  return [...text.toLowerCase()]
    .map(char => latinToSundanese[char] || char) 
    .join('');
}

const kntlsundaa = await convertToSundanese(text)
await conn.sendMessage(m.chat, {text: `${kntlsundaa}` }, {quoted: m})
}
break

case 'sunda2text': {
   if (!text) return m.reply("Example: .sunda2text bahasanya")
const sundaneseToLatin = {
  'ᮅ': 'a',
  'ᮘ': 'b',
  'ᮎ': 'c',
  'ᮓ': 'd',
  'ᮌ': 'e',
  'ᮕ': 'f',
  'ᮎ': 'g',
  'ᮠ': 'h',
  'ᮄ': 'i',
  'ᮏ': 'j',
  'ᮊ': 'k',
  'ᮜ': 'l',
  'ᮙ': 'm',
  'ᮔ': 'n',
  'ᮇ': 'o',
  'ᮕ': 'p',
  'ᮃ': 'q',
  'ᮛ': 'r',
  'ᮞ': 's',
  'ᮒ': 't',
  'ᮅ': 'u',
  'ᮗ': 'v',
  'ᮝ': 'w',
  'ᮞ': 'x',
  'ᮌ': 'y',
  'ᮚ': 'z',
  ' ': ' '
};

async function convertFromSundanese(text) {
  return [...text]
    .map(char => sundaneseToLatin[char] || char)
    .join('');
}

const kntlsunda = await convertFromSundanese(text)
await conn.sendMessage(m.chat, {text: `${kntlsunda}` }, {quoted: m})
}
break
}
}
rodotz.help = ["tosunda", "sunda2text"]
rodotz.tags = ["fun"]
rodotz.command = ["tosunda", "sunda2text"]
module.exports = rodotz