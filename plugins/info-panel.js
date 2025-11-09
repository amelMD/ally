/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

let si = require('systeminformation')
let os = require('os')
let fs = require('fs')
let util = require('util')
let osu = require('node-os-utils')
let fetch = require('node-fetch')
let { performance } = require('perf_hooks')
let { sizeFormatter } = require('human-readable')
let cp = require('child_process')
let { promisify } = require('util')

let handler = async (m, { conn, args, text, usedPrefix }) => {

let exec = promisify(cp.exec).bind(cp)
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let anu = fs.statSync('./database.json')
 let formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: '2',
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})

 let formatSizeStore = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: '2',
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})

let session = (eval(fs.readdirSync('./Ally-Sessions').map(v => fs.statSync('./Ally-Sessions/' + v).size).join('+')) / 1024 / 1024).toFixed(2)
let ftmp = (eval(fs.readdirSync('./tmp').map(v => fs.statSync('./tmp/' + v).size).join('+')) / 1024 / 1024).toFixed(2)

let OsInfo = await si.osInfo()
let System = await si.system()
let Cpu = await si.cpu()
let Mem = await si.mem()

let {platform,distro,release,codename,kernel,arch,hostname,fqdn,codepage,logofile} = OsInfo
let { manufacturer,brand,vendor,family,model,stepping,revision,voltage,speed,speedMin,speedMax,governor,cores,physicalCores,processors} = Cpu
let { total,free,used,active,available,buffers,cached,slab,buffcache} = Mem
let me = conn.user.name

let res = await fetch(API('https://ipwho.is/'))
let json = await res.json()

  let NotDetect = 'Not Detect'
  let cpux = osu.cpu
  let cpuCore = cpux.count()
  let drive = osu.drive
  let mem = osu.mem
  let netstat = osu.netstat
  let HostN = osu.os.hostname()
  let OS = osu.os.platform()
  let ipx = osu.os.ip()
  let cpuModel = cpux.model()
  let cpuPer
  let p1 = cpux.usage().then(cpuPercentage => {
	  cpuPer = cpuPercentage
  }).catch(() => {
          cpuPer = NotDetect
  })
  let driveTotal, driveUsed, drivePer
  let p2 = drive.info().then(info => {
          driveTotal = (info.totalGb + ' GB'),
          driveUsed = info.usedGb,
          drivePer = (info.usedPercentage + '%')
  }).catch(() => {
          driveTotal = NotDetect,
          driveUsed = NotDetect,
          drivePer = NotDetect
  })
  let ramTotal, ramUsed
  let p3 = mem.info().then(info => {
          ramTotal = info.totalMemMb,
          ramUsed = info.usedMemMb
  }).catch(() => {
	  ramTotal = NotDetect,
          ramUsed = NotDetect
  })
  let netsIn, netsOut
  let p4 = netstat.inOut().then(info => {
          netsIn = (info.total.inputMb + ' MB'),       
          netsOut = (info.total.outputMb + ' MB')
  }).catch(() => {
          netsIn = NotDetect,
          netsOut = NotDetect
  })
  await Promise.all([p1, p2, p3, p4])        
  let _ramTotal = (ramTotal + ' MB')
  let cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  let cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
let teks =`*System Information ${me}*

Version: 07.06.98
Runtime: ${uptime}
Uptime: ${kyun(os.uptime())}
Sessions: ${session} MB
Tmp: ${ftmp || '0'} MB
Database Size: ${formatSize(anu.size)}

*OS INFO*
Platform: ${platform}
Distro: ${distro}
Release: ${release}
Codename: ${codename}
Kernel: ${kernel}
Arch: ${arch}
Hostname: ${hostname}
Codepage: ${codepage}

*CPU INFO*
Manufacturer: ${manufacturer}
Brand: ${brand}
Vendor: ${vendor}
Family: ${family}
Model: ${model}
Speed: ${speed} Ghz
Governor: ${governor}
Cores: ${cores}
PhysicalCores: ${physicalCores}
Processors: ${processors}

*MEMORY INFO*
Memory : ${FileSize(used)} / ${FileSize(total)} 
Free : ${FileSize(free)}
Cached: ${FileSize(cached)}

*SERVER INFO*
RAM : ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}
OS : ${OS}
IP : *_#HIDDEN#_*
Country : ${json.country}
Domain : ${json.connection.domain}
CPU Model : ${cpuModel}
CPU Core : ${cpuCore} Core
CPU : ${cpuPer}%
Ram : ${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})
Drive : ${driveUsed} / ${driveTotal} (${drivePer})
Internet IN : ${netsIn}
Internet OUT : ${netsOut}
`.trim()
conn.reply(m.chat, teks, m)
}

handler.help = ['infopanel']
handler.tags = ['info']
handler.command = /^(infopanel)$/i

handler.limit = true

module.exports = handler 

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

const FileSize = (number) => {
    var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if(tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}

function msToDate(ms) {
      let days = Math.floor(ms / (24 * 60 * 60 * 1000))
      let daysms = ms % (24 * 60 * 60 * 1000)
      let hours = Math.floor((daysms) / (60 * 60 * 1000))
      let hoursms = ms % (60 * 60 * 1000)
      let minutes = Math.floor((hoursms) / (60 * 1000))
      let minutesms = ms % (60 * 1000)
      let seconds = Math.floor((minutesms) / (1000))
      return days + " Day " + hours + " Hour " + minutes + " Minute " + seconds + " Second"
    } 

function clockString(ms) {
        let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
        let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
        let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
        return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
    }