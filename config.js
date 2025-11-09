let fs = require('fs') 
let chalk = require('chalk')
let moment = require('moment-timezone')

global.owner = [
  ['6282283838574'],
  ['6282283838574'],
  ['6282283838574'],
  ['6282283838574', 'amel', 'tryarno@gmail.com', true],
  ['6282283838574', '6282283838574', 'tryarno@gmail.com', true]
] // Put your number here

global.mods = ['6282283838574']// Moderator

global.prems = ['6282283838574'] // Premium

global.api = {
   alya: '',
   kens: '',
   ana: 'rodotzkiy'
}

global.APIs = { // API Prefix
  // name: 'https://website'

  dannteam: 'https://api.dannteam.com',

  

}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.dannteam.com': 'DannTeam',

}
//═══════ ◆ Config ApiKey ◆ ═══════//

global.btc = 'zz7zuBmf'

global.lann = 'Btz-XvSmu'

global.lolhuman = 'Akiraa'

global.apikey_ciaatopup = 'CiaaTopUp_08uyhk3t3sc56uto'



global.maxlimit = 100 // setting limit untuk free user

// Setting an Owner
global.own = {
  name: 'amel',
  no: '6282283838574',
  age: '32',
  location: 'Indonesia'
}

// Setting an status
global.status = {
   error: 'Error 404',
   antibot: 'Antibot Aktif',
   version: 'V1 - BETA',
   wait: 'Wait a moment...'
}

global.media = {
   thumbnail: 'https://telegra.ph/file/b4e94050ff9481264872f.jpg',
   video: ''
}

// Setting an sosial media
global.sosial = {
   ig: '', // Instagram
   yt: '', // Youtube
   gh: '', // Github
   gc: 'https://chat.whatsapp.com/KWjnghyLxD67CVQm5SLHKd', // Group Chat / Group Wa
   wa: '', // No bot / No lu
   dc: '', // Discord
   fb: ''  // Facebook 
}

// Setting an payment
global.payment = {
  dana: '',
  ovo: '',
  gopay: '',
  pulsa: '',
  saweria: '',
  trakteer: '',
  buzz: ''
}

// Setting an wm
global.set = {
   packname: 'Created By',
   author: 'amel',
   wm: 'amel',
   name: 'Ally-Bot MD',
   title: 'Hi',
   footer: 'amel',
   error: 'Error 404'
}

/**  Setting list harga sewa & premium */
global.premium = { 
   7: '', // 7 HARI
   14: '', // 14 HARI
   30: '',  // 30 HARI
   permanen: '6282283838574' // PERMANEN JIKA TIDAK ADA GAUSAH DI ISI
}

global.premium = { 
   pertama: '', // 7 HARI
   kedua: '', // 14 HARI
   ketiga: '',  // 30 HARI
   keempat: '6282283838574' // PERMANEN JIKA TIDAK ADA GAUSAH DI ISI
}

global.sewa = { 
   pertama: '', // 7 HARI
   kedua: '', // 14 HARI
   ketiga: '',  // 30 HARI
   keempat: '6282283838574' // PERMANEN JIKA TIDAK ADA GAUSAH DI ISI
}


/** layout bot */
global.layout = {
    xl: '〆'
}

global.decor = {
	menut: '❏═┅═━–〈',
	menub: '┊•',
	menub2: '┊',
	menuf: '┗––––––––––✦',
	hiasan: '꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷',

	menut: '––––––『',
    menuh: '』––––––',
    menub: '┊☃︎ ',
    menuf: '┗━═┅═━––––––๑\n',
	menua: '',
	menus: '☃︎',

	htki: '––––––『',
	htka: '』––––––',
	haki: '┅━━━═┅═❏',
	haka: '❏═┅═━━━┅',
	lopr: 'Ⓟ',
	lolm: 'Ⓛ',
	htjava: '❃'
}

// Fake Size
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'

// Tak usah di otak atik
global.useMulti = false
global.multiplier = 1000 // This higher, The harder levelup


// Function
global.Func = new (require('./lib/function'))

global.Uploader = require('./lib/uploader.js')
// global.scrap = new (require('./lib/aploder'))
global.pe = new (require('@damaazzyn/alisaa-js'))

global.scrape = pe.Scraper
                 


// Waktu
let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wktuwib = `${wibh}:${wibm}:${wibs}`

// Hari Tanggal
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

global.bottime = `Time: ${wktuwib}`
global.botdate = `Date: ${week} ${date}\nTime: ${wktuwib}`

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1 // Tidak usah di otak atik!!!

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈' ,
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v =>vv [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})