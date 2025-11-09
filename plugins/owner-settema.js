/** !! THIS CODE GENERATE BY ALLY !! **/

/** !! THIS CODE GENERATE BY ZHUBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, {
    conn,
    command,
    text
}) => {
    conn.temamenu = conn.temamenu ? conn.temamenu : {
        id: 1
    }
    let themes = {
        1: 'Normal',
        2: 'ThumbnailUrl',
        3: 'ThumbnailUrl with Video Gif',
        4: 'ThumbnailUrl with Canvas'
    };

    if (text) {
        let themeIndex = parseInt(text);
        if (isNaN(themeIndex) || !themes[themeIndex]) {
            conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join('\n'), m);
            return;
        }
        conn.temamenu = {
            id: themeIndex
        };
        conn.reply(m.chat, 'Tema berhasil diatur\n' + themes[themeIndex], m);
    } else {
        conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join('\n'), m);
        return;
    }
};
handler.help = ['settema']
handler.tags = ['owner']
handler.command = /^(settema|settypemenu|settype)$/i
handler.owner = true

module.exports = handler