/** !! THIS CODE GENERATE BY ALLY !! **/

// kret by radit 😡😡👍
let rodotz = async (m, { conn, text, usedPrefix, command }) => {
        if (!m.quoted) throw `Reply Message`;
        let msg = await conn.loadMessage(m.quoted.id);
        if (!msg) throw "- Message Not Found !";
        let data = await conn.serializeM(msg);
        if (!data.quoted) throw "- Message Not Found !";
        return await data.quoted.copyNForward(m.chat, true);
    }
rodotz.help = ["q"]
rodotz.tags = ["tools"]
rodotz.command = ["q", "quoted"]
module.exports = rodotz

// tapi boong buatan wa.me/6285732245264