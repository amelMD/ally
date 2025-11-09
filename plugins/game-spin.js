/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { args }) => {
  if (args.length !== 1) {
    throw 'Silakan masukkan total poin yang ingin dipertaruhkan! Contoh: .spin 1000'
  }
  let bet = parseInt(args[0])
  if (isNaN(bet) || bet < 1000) {
    throw 'Total poin yang ingin dipertaruhkan harus lebih dari atau sama dengan 1000!'
  }

  let message = ''
  let poinAwal = global.db.data.users[m.sender].poin || 0
  if (poinAwal < bet) {
    throw 'Maaf, kamu tidak memiliki cukup poin untuk memainkan game spin.\n\nSilahkan ketik *.moneytopoin* untuk menambah poin agar bisa memainkan game ini!'
  }
  let users = global.db.data.users[m.sender]
    let time = users.lastspin + 3600000
    if (new Date - users.lastspin < 3600000) throw `Fitur *Spin* telah di batasi agar tidak spam!\n\n${msToTime(time - new Date())}`
  let poinAkhir = poinAwal - bet
  let spinResult = [
    { value: 0, sign: '-' },
    { value: 0, sign: '-' },
    { value: 0, sign: '-' }
  ]

  let winProbabilities = [
    { value: 80, sign: '+' },
    { value: 80, sign: '+' },
    { value: 20, sign: '+' }
  ]

  for (let i = 0; i < spinResult.length; i++) {
    let rand = Math.floor(Math.random() * 100) + 1
    let winProb = winProbabilities[i].value
    let sign = winProbabilities[i].sign
    if (rand <= winProb) {

      let winAmount = Math.floor(Math.random() * 500000) + 100000
      if (i === 2) {

        winAmount = Math.floor(Math.random() * 10000000000) + 1000000000
      }
      poinAkhir += winAmount
      spinResult[i].value = winAmount
      spinResult[i].sign = '+'
    } else {

      let loseAmount = Math.floor(Math.random() * 5000) + 1000
      poinAkhir -= loseAmount
      spinResult[i].value = loseAmount
    }
  }

  if (poinAkhir < 0) {
    poinAkhir = 0
  }

  message += 'Hasil Spin Kamu Adalah\n\n'
  for (let i = 0; i < spinResult.length; i++) {
    let value = spinResult[i].value
    let sign = spinResult[i].sign
    message += `    ${sign} ${value.toString().padStart(7)}\n`
  }
  message += '\n• Total : ' + (poinAkhir - poinAwal).toString()
  message += '\n\nPoin kamu sekarang: ' + poinAkhir.toString()

  global.db.data.users[m.sender].poin = poinAkhir
  global.db.write()

  users.lastspin = new Date * 1
  await new Promise(resolve => setTimeout(resolve, 1000))
  await conn.sendMessage(m.chat, {
    react: {
      text: '💵',
      key: m.key,
    }
  })
  conn.sendMessage(m.chat, {
        text: message,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: `${xl} S P I N`,
                thumbnailUrl: 'https://telegra.ph/file/a5350c263c9d4f324b4fd.jpg',
                sourceUrl: '',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m});
}

handler.help = ['spin <total poin>']
handler.tags = ['game']
handler.command = /^spin$/i
handler.game = true
handler.register = false
handler.limit = true

module.exports = handler

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    return minutes + " menit " + seconds + " detik"
}