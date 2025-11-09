/** !! THIS CODE GENERATE BY ALLY !! **/

let axios = require('axios')
let cheerio = require('cheerio')

let handler = async (m, { usedPrefix, command, args, text }) => {
  try {
    const timer = 18000
    conn.gore = conn.gore ? conn.gore : []
    if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, 'bomb'), m)
    const check = conn.gore.find((v) => v.jid == m.sender)
    if (!check && !isNaN(text)) return m.reply(Func.texted('bold', `🚩Sesi Kamu telah kedaluwarsa / tidak ada, lakukan pencarian lain menggunakan kata kunci yang Kamu inginkan.`))
    if (check && !isNaN(text)) {
      if (Number(text) > check.results.length) return m.reply(Func.texted('bold', `🚩 Melebihi jumlah data.`))
      m.react('🕒')

      const json = await sgoredl(check.results[Number(text) - 1])
      let teks = `乂 *G o r e*\n\n`
      teks += '  ◦  *Title* : ' + json.data.judul + '\n'
      teks += '  ◦  *Views* : ' + json.data.views + '\n'
      teks += '  ◦  *Comment* : ' + json.data.comment + '\n\n' + set.footer

      conn.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
          externalAdReply: {
            title: set.bot,
            thumbnailUrl: media.thumbnail,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m }).then(() => {
        conn.sendFile(m.chat, json.data.link, 'gore.mp4', set.footer, m)
      })
    } else {
      m.react('🕒')
      const json = await ssearchgore(text)
      if (!check) {
        conn.gore.push({
          jid: m.sender,
          query: text,
          results: json.data.map((v) => v.link),
          created_at: new Date() * 1,
        })
      } else check.results = json.data.map((v) => v.link)
      let p = `Untuk mendownload Video gunakan perintah *${usedPrefix + command} nomor*\n`
      p += `Contoh : ${usedPrefix + command} 1\n\n`
      json.data.map((v, i) => {
        p += `*${i + 1}*. ` + v.judul + `\n`
        p += ` ◦  *Uploader* : ` + v.uploader + `\n\n`
      }).join(`\n\n`)
      m.reply(p)
    }
    setInterval(async () => {
      const session = conn.gore.find((v) => v.jid == m.sender)
      if (session && new Date() - session.created_at > timer) {
        Func.removeItem(conn.gore, session)
      }
    }, 60_000)
  } catch (e) {
    console.log(e)
    return m.reply("An error occurred while processing your request.")  // Basic error message, replace with status.error if available
  }
}
handler.help = handler.command = ['gore']
handler.tags = ['downloader']
handler.limit = true
handler.premium = true
module.exports = handler

async function ssearchgore(query) {
	return new Promise(async (resolve, reject) => {
		axios.get('https://seegore.com/?s=' + query).then(dataa => {
			const $$$ = cheerio.load(dataa)
			let pagina = $$$('#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a').text();
			let slink = 'https://seegore.com/?s=' + query
			axios.get(slink)
				.then(({
					data
				}) => {
					const $ = cheerio.load(data)
					const link = [];
					const judul = [];
					const uploader = [];
					const format = [];
					const thumb = [];
					$('#post-items > li > article > div.content > header > h2 > a').each(function(a, b) {
						link.push($(b).attr('href'))
					})
					$('#post-items > li > article > div.content > header > h2 > a').each(function(c, d) {
						let jud = $(d).text();
						judul.push(jud)
					})
					$('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function(e, f) {
						let upl = $(f).text();
						uploader.push(upl)
					})
					$('#post-items > li > article > div.post-thumbnail > a > div > img').each(function(g, h) {
						thumb.push($(h).attr('src'))
					})
					for (let i = 0; i < link.length; i++) {
						format.push({
							judul: judul[i],
							uploader: uploader[i],
							thumb: thumb[i],
							link: link[i]
						})
					}
					const result = {
						creator: "Wudysoft",
						data: format
					}
					resolve(result)
				})
				.catch(reject)
		})
	})
}

async function sgoredl(link) {
	return new Promise(async (resolve, reject) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $$ = cheerio.load(data)
				const format = {
					judul: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
					views: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
					comment: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
					link: $$('video > source').attr('src')
				}
				const result = {
					creator: "Wudysoft",
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}

/* New Line */
async function schara(query) {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.anime-planet.com/characters/all?name=${query}&sort=likes&order=desc`)
			.then((data) => {
				const $ = cheerio.load(data.data)
				const linkp = $('#siteContainer > table > tbody > tr:nth-child(1) > td.tableCharInfo > a').attr('href')
				axios.get('https://www.anime-planet.com' + linkp)
					.then((data) => {
						//console.log(data.data)
						const $$ = cheerio.load(data.data)
						resolve({
							nama: $$('#siteContainer > h1').text(),
							gender: $$('#siteContainer > section.pure-g.entryBar > div:nth-child(1)').text().split('\nGender: ')[1],
							warna_rambut: $$('#siteContainer > section.pure-g.entryBar > div:nth-child(2)').text().split('\nHair Color: ')[1],
							warna_mata: $$('#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(1) > div').text().split('\n')[1],
							gol_darah: $$('#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(2) > div').text().split('\n')[1],
							birthday: $$('#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(3) > div').text().split('\n')[1],
							description: $$('#siteContainer > section:nth-child(11) > div > div > div > div:nth-child(1) > p').text()
						})
					})
			})
			.catch(reject)
	})
}