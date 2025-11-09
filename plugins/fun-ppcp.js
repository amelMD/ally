/** !! THIS CODE GENERATE BY ALLY !! **/

/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • PP Couple
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l

Note : ada yg req
*/

const fetch = require('node-fetch');

const handler = async (m, {
    conn
}) => {
    const fetchJson = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        return response.json();
    };

    const url = "https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json";

    try {
        await conn.sendMessage(m.chat, {
            react: {
                text: "⏳",
                key: m.key
            }
        });
        const data = await fetchJson(url);
        const randomCouple = data[Math.floor(Math.random() * data.length)];

        await conn.sendMessage(
            m.chat, {
                image: {
                    url: randomCouple.male
                },
                caption: "👦 *Male*"
            }, {
                quoted: m
            }
        );

        await conn.sendMessage(
            m.chat, {
                image: {
                    url: randomCouple.female
                },
                caption: "👩 *Female*"
            }, {
                quoted: m
            }
        );
    } catch (error) {
        await conn.sendMessage(m.chat, {
            text: `${error.message}`
        }, {
            quoted: m
        });
    }
};

handler.help = ["couple"];
handler.tags = ["fun"];
handler.command = /^(ppc|ppcouple|couple|ppcp)$/i;
handler.limit = true
handler.register = false
module.exports = handler;