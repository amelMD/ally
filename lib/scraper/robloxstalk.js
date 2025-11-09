const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require("axios")

const robloxInfo = async (usernames) => {
    try {
        const fetchJson = async function (url, options) {
            return (await fetch(url, options)).json();
        };

        const getUsernameData = async function () {
            return fetchJson("https://users.roblox.com/v1/usernames/users", {
                method: "POST",
                body: JSON.stringify({ "usernames": [usernames] }),
                headers: { "Content-Type": "application/json" }
            });
        };

        const getUserData = async function (id) {
            return fetchJson("https://users.roblox.com/v1/users/" + id);
        };
        
        const getProfile = async function (id) {
            return fetchJson("https://thumbnails.roblox.com/v1/users/avatar?userIds=" + id + "&size=720x720&format=Png&isCircular=false");
        };

        const getPresenceData = async function (id) {
            return fetchJson("https://presence.roblox.com/v1/presence/users", {
                method: "POST",
                body: JSON.stringify({ "userIds": [parseInt(id)] }),
                headers: { "Content-Type": "application/json" }
            });
        };

        const { data } = await getUsernameData();
        const id = data[0].id;

        const userDetails = await getUserData(id);
        
        const profileDetails = (await getProfile(id)).data[0].imageUrl;
        
        const lastOnline = (await getPresenceData(id)).userPresences[0].lastOnline;

        return { userDetails, lastOnline, profileDetails};
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
robloxInfo 
}