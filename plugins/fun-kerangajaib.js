/** !! THIS CODE GENERATE BY ALLY !! **/

let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `Use example ${usedPrefix}${command} i'm alien?`

m.reply(pickRandom(monster))
}
handler.help = ['kerang', 'kerangajaib'].map(v => v + ' <teks>')
handler.tags = ['kerang', 'fun']

handler.command = /^(kulit)?kerang(ajaib)?$/i

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

   let monster = [
        'Mungkin suatu hari',
        'Tidak juga',
        'Tidak keduanya',
        'Kurasa tidak',
        'Ya',
        'Boleh',
        'Mungkin',
        'Ya, Mungkin',
        'Coba tanya lagi',
        'Tidak ada'
    ]