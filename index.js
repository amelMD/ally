require("./config")
const cluster = require("cluster");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const { handleUnhandledRejection, handleUncaughtException } = require("./lib/fix");
const axios = require('axios')

const moment = require("moment");
const CFonts = require('cfonts');
const chalk = require('chalk');

const os = require('os');
const platform = require('platform');
const { performance } = require('perf_hooks');
const speedTest = require('speedtest-net');

const chokidar = require("chokidar");

const PORT = process.env.PORT || 8080;

process.on("unhandledRejection", handleUnhandledRejection);
process.on("uncaughtException", handleUncaughtException);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

if (cluster.isMaster) {
  const watcher = chokidar.watch("plugins", {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  });

  watcher.on("change", async (path) => {
    console.log(`File ${path} berhasil di ganti, sedang restarting...`);

    try {
      const originalCode = fs.readFileSync(path, "utf8");
      fs.writeFileSync(path, originalCode, "utf8");
      console.log(`File ${path} berhasil di perbaiki otomatis.`);

      cluster.worker.send("reset");
    } catch (error) {
      console.error(`Terjadi kesalahan dan restarting ${path}:`, error);
    }
  });

  console.log(
    `\x1b[33mâ—¦ Cluster Master \x1b[37m(Id ${process.pid})\x1b[33m is running\x1b[0m`
  );

  for (let i = 0; i < (process.env.CLUSTER_COUNT || 1); i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `\x1b[31mâ—¦ Worker \x1b[37m(Id ${worker.process.pid})\x1b[31m died\x1b[0m`
    );
    cluster.fork();
  });
} else {
  start("main.js");
}

var isRunning = false;

async function start(file) {
  if (isRunning) return;
  
  try {
    
    CFonts.say('Ally - MD', {
      font: "block",
      align: "center",
      colors: ["magenta"],
      background: "black",
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: "0"
    })
      
    function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const conn of iface) {
      if (conn.family === 'IPv4' && !conn.internal) {
        return conn.address;
      }
    }
  }
  return 'N/A';
}
     
    console.log(chalk.red("[STATUS] >> " + chalk.green("Starting... ")))
    const packages = JSON.parse(fs.readFileSync('package.json')).version
    let old = performance.now()
    let news = performance.now()
    let speed = `${news - old} milliseconds`
    let platformName = os.platform()
    let architecture = os.arch()
    let memory = `${(os.freemem() / (1024 ** 3)).toFixed(2)} - ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`
    let cpus = os.cpus()
    let model = cpus && cpus.length > 0 ? `${cpus[0].model} - ${cpus.length}` : 'N/A'
    let parsedPlatform = platform.parse()
    let ipAddress = getIPAddress()
    let deviceType
    if (platformName === 'Win32') {
      deviceType = 'Windows'
    } else if (platformName === 'Amel') {
      deviceType = 'iPhone'
    } else {
      deviceType = 'Phone'
    }
    const botInfo = `-----> Informasi <-----\n• Namebot: ${set.name}\n• Version: ${packages}\n• Author: ${own.name}\n\n-----> Spesifikasi <-----\n• Speed: ${speed}\n• Platform: ${platformName}\n• Architecture: ${architecture}\n• Memory: ${memory}\n• Model: ${model}\n• P-Platform: ${parsedPlatform}\n• IP Address: ${ipAddress}\n• Device: ${deviceType}\n\n-----> Messages <-----`
    console.log(chalk.blueBright(botInfo))
      
    isRunning = true;
    var args = [path.join(__dirname, file), ...process.argv.slice(2)];
    var p = spawn(process.argv[0], args, {
      stdio: ["inherit", "inherit", "pipe", "ipc"],
    });

    let errorStack = "";

    p.stderr.on("data", (data) => {
      errorStack += data.toString();
    });

    p.on("message", (data) => {
      console.log("[ Ally - Beta ]", data);
      switch (data) {
        case "reset":
          p.kill();
          isRunning = false;
          start.apply(this, arguments);
          break;
        case "uptime":
          p.send(process.uptime());
          break;
      }
    });

    p.on("exit", (code) => {
      isRunning = false;
      console.error("Exited with code:", code);

      if (code !== null) {
        const now = moment().format("YYYY-MM-DD_HH-mm-ss");
        const logFileName = `error_log_${now}.txt`;
        const logFilePath = path.join(__dirname, logFileName);

        const logContent = `
          ===== Error Log - ${now} =====
          Exit Code: ${code}
          Error Stack: ${errorStack || "No error stack available"}
          ===============================
        `;

        fs.writeFile(logFilePath, logContent, (err) => {
          if (err) console.error("Error writing log file:", err);
          console.log("Error log saved to:", logFileName);
        });

        fs.watchFile(args[0], () => {
          fs.unwatchFile(args[0]);
          fs.writeFile(logFilePath, logContent, (err) => {
            if (err) console.error("Error writing log file:", err);
            console.log("Error log saved to:", logFileName);
          });
          start(file);
        });
      } else {
        console.log("Exited with code: null. Restarting...");
        start("main.js");
      }
    });

    console.log(`${set.wm} server is running on port ${PORT}`);
  } catch (e) {
    console.error("Terjadi kesalahan:", e);
  }
}