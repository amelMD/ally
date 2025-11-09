/** !! THIS CODE GENERATE BY ALLY !! **/

/*
By Putramodz/Mputz
Don't Delete This Wm:)
My Group: https://chat.whatsapp.com/Gl5ALz9UkSOFHzJFRqdgd2
*/

let Amelia = async (
    m, {
        isAdmin,
        isOwner,
        isBotAdmin,
        conn,
        args,
        usedPrefix,
        command
    },
) => {
    global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
    let chat = global.db.data.chats[m.chat];
    let prefix = usedPrefix;
    let successMsg = `*[ ✓ ] Success turned on Anti Tag Status on this group*`.trim();

    let isEnable = {
        on: true,
        off: false,
    }[args[0] || ""];

    if (isEnable === undefined) {
        let usageMsg = `*[ ${command.toUpperCase()} EXAMPLE ]*:
> *• Example :* ${usedPrefix + command} on
> *• Example :* ${usedPrefix + command} off`;
        m.reply(usageMsg);
        throw false;
    } else if (isEnable === false) {
        chat.antitagsw = false;
        await m.reply("*[ ✓ ] Successfully turned off Anti Tag Status on this group*");
    } else if (isEnable === true) {
        chat.antitagsw = true;
        await m.reply(successMsg);
    }
};

Amelia.help = ["antitagsw *[on/off]*"];
Amelia.tags = ["group"];
Amelia.command = ["antitagsw"];
Amelia.group = true;
Amelia.admin = true;
Amelia.botAdmin = false;

module.exports = Amelia;