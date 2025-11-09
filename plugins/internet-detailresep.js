/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

let rodotz = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan Link!\n\nContoh: ${usedPrefix + command} link`
m.react('🕒')
try {
let res = await detailresep(text)
let teks = `${layout.xl}  *D e t a i l - R e s e p*\n\n`
    teks += `  ∘  *Judul* : ${res.data.judul}\n`
    teks += `  ∘  *Waktu Masak* : ${res.data.waktu_masak}\n`
     teks += `  ∘  *Hasil* : ${res.data.hasil}\n`
    teks += `  ∘  *Tingkat Kesulitan* : ${res.data.tingkat_kesulitan}\n\n`
    teks += `  ∘  *Bahan - Bahan* : ${res.data.bahan}\n`
    teks += `  ∘  *Langkah - Langkah* : ${res.data.langkah_langkah}\n\n${set.footer}`
conn.sendFile(m.chat, res.data.thumb, 'menu.jpg', teks, m)
  } catch (e) {
    console.log(e)
    return m.reply(eror)
  }
}
rodotz.help = ["detailresep"]
rodotz.tags = ["internet"]
rodotz.command = ["detailresep"]
module.exports = rodotz

    let axios = require('axios')
    let cheerio = require('cheerio')

async function detailresep(query) {
    return new Promise(async (resolve,
        reject) => {
        axios.get(query).then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const abahan = [];
                const atakaran = [];
                const atahap = [];
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function(a, b) {
                    let bh = $(b).text();
                    abahan.push(bh)
                })
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function(c, d) {
                    let uk = $(d).text();
                    atakaran.push(uk)
                })
                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function(e, f) {
                    let th = $(f).text();
                    atahap.push(th)
                })
                const judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text();
                const waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text();
                const hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1]
                const level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1]
                const thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src')
                let tbahan = 'bahan\n'
                for (let i = 0; i < abahan.length; i++) {
                    tbahan += abahan[i] + ' ' + atakaran[i] + '\n'
                }
                let ttahap = 'tahap\n'
                for (let i = 0; i < atahap.length; i++) {
                    ttahap += atahap[i] + '\n\n'
                }
                const tahap = ttahap
                const bahan = tbahan
                const result = {
                    creator: 'Rodotz',
                    data: {
                        judul: judul,
                        waktu_masak: waktu,
                        hasil: hasil,
                        tingkat_kesulitan: level,
                        thumb: thumb,
                        bahan: bahan.split('bahan\n')[1],
                        langkah_langkah: tahap.split('tahap\n')[1]
                    }
                }
                resolve(result)
            })
            .catch(reject)
    })
}