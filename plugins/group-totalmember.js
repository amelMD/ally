/** !! THIS CODE GENERATE BY ALLY !! **/

let PhoneNum = require("awesome-phonenumber");

let handler = async (m, { conn, text, usedPrefix, command, groupMetadata }) => {
        let nama = await conn.getName(m.sender);  
        let regionNames = new Intl.DisplayNames(["en"], {
            type: "region",
        });

        // Ensure we have valid group metadata
        let data = groupMetadata;
        if (!data) {
            throw new Error("Failed to retrieve group metadata");
        }

        let arr = [];
        for (let i of data.participants) {
            arr.push({
                number: i.id,
                code: regionNames.of(PhoneNum("+" + i.id.split("@")[0]).getRegionCode("international")),
            });
        }

        let countryCounts = {};
        for (let contact of arr) {
            let country = contact.code;
            countryCounts[country] = (countryCounts[country] || 0) + 1;
        }

        let countryCountsArray = Object.keys(countryCounts).map((country) => ({
            name: country,
            total: countryCounts[country],
        }));

        let totalSum = countryCountsArray.reduce((acc, country) => acc + country.total, 0);
        let totalRegion = [...new Set(arr.map(a => a.code))];
        let hasil = countryCountsArray.map(({
            name,
            total
        }) => ({
            name,
            total,
            percentage: ((total / totalSum) * 100).toFixed(2) + '%'
        }));

        let cap = `┌─⭓「 *TOTAL MEMBER* 」
│ *• Name :* ${data.subject}
│ *• Total :* ${data.participants.length}
│ *• Total Region :* ${totalRegion.length}
└───────────────⭓

┌─⭓「 *REGION MEMBER* 」
${hasil.sort((b, a) => a.total - b.total).map(a => `│ *• Region :* ${a.name} *[ ${a.percentage} ]*
│ *• Total :* ${a.total} Member`).join("\n")}
└───────────────⭓`;

        const fpayment = {
            "key": {
                "remoteJid": "0@s.whatsapp.net",
                "fromMe": false,
                "id": "BAE595C600522C9C",
                "participant": "0@s.whatsapp.net"
            },
            "message": {
                "requestPaymentMessage": {
                    "currencyCodeIso4217": "USD",
                    "amount1000": 100000000,
                    "requestFrom": "0@s.whatsapp.net",
                    "noteMessage": {
                        "extendedTextMessage": {
                            "text": "Halo bang: " + nama
                        }
                    },
                    "expiryTimestamp": 100000000000,
                    "amount": {
                        "value": 100000000000,
                        "offset": 1000000000000,
                        "currencyCode": "USD"
                    }
                }
            }
        };

        conn.reply(m.chat, cap, fpayment)
};

handler.help = ["totalmem", "totalmember"].map(a => a + " *[get totalmember]*");
handler.tags = ["group"];
handler.command = ["totalmem", "totalmember"];
handler.group = true;

module.exports = handler;