/** !! THIS CODE GENERATE BY ALLY !! **/

let handler  = async (m, { conn, args }) => {
  
  let teks = `*Syarat & Ketentuan ${await conn.user.name}*

1. Teks dan nama pengguna WhatsApp anda kami simpan di dalam server selama bot aktif.
2. Data anda akan di hapus ketika bot offline.
3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim.
4. Kami tidak pernah meminta anda untuk memberikan informasi pribadi.
5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot.
6. Cukup perintah 1x jika bot tidak merespon harap ulangi kembali, Jika di ulangi kembali tidak merespon, Bot tidak aktif
7. Jika anda spam, Kami akan memblockir anda
8. Dilarang spam, Share virus virtex, Telpon, Video call, Chat pribadi, Kami akan blockir anda.
9. Jika kalian telah mengekick bot (expired/durasi hangus!)
10. Sewaktu-waktu admin/owner bot akan nyimak/nimbrung di nomor bot tersebut.
11. Apapun bot masuk group harus di sewa, tidak ada meminta owner untuk join beberapa menit.
12. Apapun yang anda perintah pada bot ini,
*KAMI TIDAK BERTANGGUNG JAWAB!*

TERIMA KASIH !~`.trim()
    conn.sendFile(m.chat, media.thumbnail, 'pp.png', teks, m)
   // conn.sendButton(m.chat, teks, set.author, pp, [[`PING`, `.ping`],[`INFOBOT`, `.infobot`]], m)
 } 

 handler.help = ['rules']
 handler.tags = ['info']
 handler.command = /^rules$/i
 
module.exports = handler