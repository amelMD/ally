/** !! THIS CODE GENERATE BY ALLY !! **/

const axios = require('axios');

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (command == 'stalkff') {
        if (!text) return m.reply(`Provide Free Fire game ID\n\n*Example*: ${usedPrefix + command} 123456789`);
      
        try {
            let { data } = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`);
            
            if (!data.status) {
                return m.reply('Failed to get data, try again later.');
            }

            let account = data.data.account;
            let petInfo = data.data.pet_info;
            let guild = data.data.guild;
            let ketuaGuild = data.data.ketua_guild;

            let result = `乂  *F R E E - F I R E - A C C O U N T*

🆔 *ID*: ${account.id}
👤 *Nama*: ${account.name}
📈 *Level*: ${account.level}
🔸 *XP*: ${account.xp}
🌍 *Region*: ${account.region}
❤️ *Like*: ${account.like}
📜 *Bio*: ${account.bio}
📅 *Dibuat Pada*: ${account.create_time}
⏰ *Login Terakhir*: ${account.last_login}
🎖️ *Honor Score*: ${account.honor_score}
🔥 *Booyah Pass*: ${account.booyah_pass}
🔰 *Booyah Pass Badge*: ${account.booyah_pass_badge}
🚀 *Evo Access Badge*: ${account.evo_access_badge}
🏆 *Equipped Title*: ${account.equipped_title}
💥 *BR Points*: ${account.BR_points}
⚔️ *CS Points*: ${account.CS_points}

乂  *S E L E C T E D - A N I M A L S*

🐶 *Nama*: ${petInfo.name}
🔸 *Level*: ${petInfo.level}
🔸 *Tipe*: ${petInfo.type}
🔸 *XP*: ${petInfo.xp}

乂  *G U I L D*

🏰 *Nama Guild*: ${guild.name}
🆔 *ID Guild*: ${guild.id}
🔸 *Level Guild*: ${guild.level}
🔸 *Anggota Guild*: ${guild.member}
🔸 *Kapasitas Guild*: ${guild.capacity}

乂  *G U I L D - L E A D E R*

📅 *Dibuat Pada*: ${ketuaGuild.create_time}
⏰ *Login Terakhir*: ${ketuaGuild.last_login}
📜 *BP Badges*: ${ketuaGuild.BP_bagdes}
🏆 *BR Points*: ${ketuaGuild.BR_points}
⚔️ *CS Points*: ${ketuaGuild.CS_points}
📈 *Level*: ${ketuaGuild.level}
❤️ *Like*: ${ketuaGuild.like}
👤 *Nama*: ${ketuaGuild.name}
🔰 *Equipped Title*: ${ketuaGuild.equipped_title}
🆔 *ID*: ${ketuaGuild.id}
🔸 *XP*: ${ketuaGuild.xp}
`;

            m.reply(result);
        } catch (err) {
            console.error(err);
            m.reply('An error occurred while processing the request.');
        }
    }

    if (command == 'stalkml') {
        let [id, zoneId] = text.split(',');
        if (!id || !zoneId) return m.reply(`Provide Free Fire game ID\n\n*Example*: ${usedPrefix + command} 123456789,1234`);
        
        try {
            let { data } = await axios.get(`https://vapis.my.id/api/ml-stalk?id=${id}&zoneid=${zoneId}`);
            
            if (!data.status) {
                return m.reply('Failed to get data, please try again later.');
            }

            let userData = data.data;

            let result = `
乂  *M O B I L E - L E G E N D S - A C C O U N T*

👤 *Nama Pengguna*: ${userData.data.userNameGame}
🆔 *ID*: ${userData.gameId}
🌍 *Zona*: ${userData.zoneId}
💎 *Level*: ${userData.product.level}
🏆 *Harga*: ${userData.price}
🔥 *Nama Game*: ${userData.product.gameName}
📜 *Metode Pembayaran*: ${userData.product.paymentType}
`;

            m.reply(result);
        } catch (err) {
            console.error(err);
            m.reply(`Failed to execute ${command} command\nError: _${e.message}_`);
        }
    }
};

handler.help = handler.command = ['stalkff', 'stalkml'];
handler.tags = ['tools'];

module.exports = handler;