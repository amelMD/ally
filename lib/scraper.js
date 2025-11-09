const axios = require("axios")

function ttStalk(username) {
  return new Promise((resolve, reject) => {
    if (!username) return reject(new Error("Masukkan Username!"));
    axios.get("https://tiktod.eu.org" + "/stalk", { params: { username } })
      .then((stalker) => resolve(stalker.data))
      .catch(reject);
  });
}

function ttPorn() {
  return new Promise((resolve, reject) => {
    axios.get("https://tiktod.eu.org" + "/porn")
      .then((porner) => resolve(porner.data))
      .catch(reject);
  });
}

function ttDownload(url) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("Masukkan URL!"));
    axios.get("https://tiktod.eu.org" + "/download", { params: { url } })
      .then((dl) => resolve(dl.data))
      .catch(reject);
  });
}

module.exports = {
  ttStalk,
  ttPorn,
  ttDownload
}