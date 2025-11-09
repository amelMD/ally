/** !! THIS CODE GENERATE BY ALLY !! **/

/* ─────────────────────
*Branpedia | Bran E-sport*
*WhatsApp:* +6285795600265
*GitHub:* github.com/branpedia
*Saluran Official Kami:* https://whatsapp.com/channel/0029VaR0ejN47Xe26WUarL3H
─────────────────────*/

const { randomInt } = require('crypto');

const handler = async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('⚠️ Fitur ini hanya untuk owner.')

    let groups = await conn.groupFetchAllParticipating()
    let groupIds = Object.keys(groups)

    let sukses = 0, gagal = 0, totalDibagi = 0

    for (let id of groupIds) {
        try {
            let metadata = await conn.groupMetadata(id)
            let members = metadata.participants.filter(p => !p.admin && !p.id.endsWith(':admin')) // hindari admin

            if (!members.length) continue

            let target = members[Math.floor(Math.random() * members.length)].id
            let jumlah = randomInt(20, 51) // acak antara 20 - 50

            global.db.data.users[target] = global.db.data.users[target] || {}
            global.db.data.users[target].limit = (global.db.data.users[target].limit || 0) + jumlah
            totalDibagi += jumlah

            await conn.sendMessage(id, {
                text: `🎉 *GIVEAWAY LIMIT!* 🎉\nSelamat kepada <@${target.split('@')[0]}>!\nKamu mendapatkan *${jumlah}* limit gratis!`,
                mentions: [target]
            })

            sukses++
        } catch (e) {
            console.log('❌ Gagal kirim ke grup:', id, e)
            gagal++
        }

        await delay(7000 + Math.floor(Math.random() * 3000)) // Delay 7-10 detik
    }

    await m.reply(`✅ Giveaway selesai!\n📤 Grup berhasil: ${sukses}\n❌ Gagal: ${gagal}\n🎁 Total limit dibagikan: ${totalDibagi}`)
}

handler.command = /^giveawaylimit$/i
handler.owner = true
handler.tags = ['owner']
handler.help = ['giveawaylimit']
module.exports = handler

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}