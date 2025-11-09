/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let axios = require('axios')
let cheerio = require('cheerio')
let Jimp = require('jimp')

function _token(host) {
	return new Promise(async (resolve, reject) => {
		axios.request({
			url: host, method: 'GET', headers
		}).then(({ data }) => {
			let $ = cheerio.load(data)
			let token = $('#token').attr('value')
			resolve(token)
		})
	})
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const delay = time => new Promise(res => setTimeout(res, time))

function generate(n) {
	var add = 1, max = 12 - add
	if ( n > max ) return generate(max) + generate(n - max)
	max        = Math.pow(10, n+add)
	var min    = max/10
	var number = Math.floor( Math.random() * (max - min + 1) ) + min
	return ('' + number).substring(add)
}

async function getBuffer(url, options){
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const headers = {
	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
	"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
}

function isNumber(number) {
	if (!number) return number
	number = parseInt(number)
	return typeof number == 'number' && !isNaN(number)
}

function isUrl(string) {
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
}

function niceBytes(x) {
	let units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(x, 10) || 0;
	while(n >= 1024 && ++l){
		n = n/1024;
	}
	return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

function padLead(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

function pickRandom(list) {
	return list[Math.floor(list.length * Math.random())]
}

function ranNumb(min, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

const readMore = String.fromCharCode(8206).repeat(4001)

async function resize(buffer, width, height) {
	var oyy = await Jimp.read(buffer);
	var kiyomasa = await oyy.resize(width, height).getBufferAsync(Jimp.MIME_JPEG)
	return kiyomasa
}

function runtime(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

function runtimes(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + "d " : "";
	var hDisplay = h < 10 ? "0" + h + ":" : h > 0 ? h + ":" : "";
	var mDisplay = m < 10 ? "0" + m + ":" : m > 0 ? m + ":" : "";
	var sDisplay = s < 10 ? "0" + s : s > 0 ? s : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

const someincludes = ( data, id ) => {
	let res = data.find(el => id.includes(el) )
	return res ? true : false;
}

const somematch = ( data, id ) => {
	let res = data.find(el => el === id )
	return res ? true : false;
}

function stream2buffer(stream) {
	return new Promise((resolve, reject) => {		
		const _buf = [];
		stream.on("data", (chunk) => _buf.push(chunk));
		stream.on("end", () => resolve(Buffer.concat(_buf)));
		stream.on("error", (err) => reject(err));
	})
}

async function closegc() {

        const moment = require('moment-timezone')
        let data = fs.readFileSync("./function/database/grup.json")
        let json = JSON.parse(data)
        const time = moment.tz('Asia/Jakarta').format('HH:mm');


        for (let schedule of json) {
        try {
            let anon = (await conn.groupMetadata(schedule)).announce;
            if (time === '00:00' && anon === false) {
                await conn.groupSettingUpdate(schedule, 'announcement');
                await conn.delay(1000)
                await conn.reply(schedule, '*[System Notice]*\n\n\`\`\`Halo semua, maaf mengganggu. Sistem grup WhatsApp akan ditutup sementara karena sudah larut malam. Mohon maaf atas ketidaknyamanannya. Silakan istirahat yang baik dan kita akan melanjutkan percakapan besok pagi. Terima kasih atas pengertian dan kerjasamanya. Selamat malam!.\`\`\`', null);

            } else if (time === '05:30' && anon === true) {
                await conn.groupSettingUpdate(schedule, 'not_announcement');
                await conn.delay(1000)

                await conn.reply(schedule, '*[System Notice]*\n\n\`\`\`Selamat pagi, teman-teman! Semoga hari ini penuh dengan semangat dan kebahagiaan. Mari kita mulai hari ini dengan semangat yang tinggi dan berbagi kebaikan di grup WhatsApp kita. Selamat beraktivitas dan semoga hari ini menjadi hari yang produktif dan menyenangkan bagi kita semua.\`\`\`', null);

                let anon = (await conn.groupMetadata(schedule)).announce;
            } else if (time === '18:00' && anon === false) {
                await conn.groupSettingUpdate(schedule, 'announcement');
                await conn.delay(1000)
                await conn.reply(schedule, '*[System Notice]*\n\n\`\`\`Halo semuanya! Sistem grup WhatsApp akan ditutup sementara karena sudah memasuki waktu magrib. Silakan istirahat sejenak dan nikmati waktu bersama keluarga atau melakukan aktivitas lainnya. Kami akan membuka kembali sistem grup ini setelah waktu Maghrib. Terima kasih atas pengertian dan kerjasamanya. Selamat beristirahat!\`\`\`', null);

            } else if (time === '18:10' && anon === true) {
                await conn.groupSettingUpdate(schedule, 'not_announcement');
                await conn.delay(1000)

                await conn.reply(schedule, '*[System Notice]*\n\n\`\`\`Selamat malam semuanya! Sistem grup WhatsApp telah dibuka setelah magrib. Semoga kita semua telah menjalankan ibadah dengan baik dan mendapatkan berkah di hari ini. Mari kita berbagi cerita, informasi, dan kebahagiaan bersama di grup ini. Selamat bergabung dan semoga kita memiliki waktu yang menyenangkan!\`\`\`', null);


            }
    
            } catch (e) {
      //  console.log('eror: bot tidak terdaftar dalam grup')
        json.splice(json.indexOf(schedule), 1);
                // Menyimpan perubahan kembali ke file grup.json
         fs.writeFileSync('./function/database/grup.json', JSON.stringify(json));
                return json
        }
        }
        }
        

module.exports = {
	_token,
	capitalizeFirstLetter,
	delay,
	generate,
	getBuffer,
	getRandom,
	headers,
	isUrl,
	isNumber,
	niceBytes,
	padLead,
	pickRandom,
	ranNumb,
	resize,
	runtime,
	runtimes,
	readMore,
	someincludes,
	somematch,
	stream2buffer,
    closegc
}