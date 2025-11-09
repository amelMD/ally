/** !! THIS CODE GENERATE BY ALLY !! **/

const { createCanvas, loadImage } = require('canvas');
const { Sticker } = require('wa-sticker-formatter');
const fs = require('fs');

let handler = async (m, { conn, text, command }) => {
    const usedPrefix = '/'; // Prefix used by the bot, for example '/' or '!'
    
    if (!text) return conn.reply(m.chat, `Contoh : ${usedPrefix + command} How Are You Today?`, m);

    await conn.reply(m.chat, 'Please wait...', m);

    // Automatically add a period at the end of the text
    let inputText = text.charAt(0).toUpperCase() + text.slice(1) + '.';

    let fontSize = 40;
    let fontColor = 'black';
    let textX = 50;
    let textY = 100;
    const maxWidth = 400;

    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    // Function to draw background
    function drawBackground() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Function to draw text
    function drawText() {
        // Use a font that supports emojis (can replace with other fonts if needed)
        ctx.font = `${fontSize}px sans-serif`; // Use system font with emoji support
        ctx.fillStyle = fontColor;

        const words = inputText.split(' ');
        let line = '';
        let lines = [];

        // Handle word wrapping
        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            let testWidth = ctx.measureText(testLine).width;

            if (testWidth > maxWidth && i > 0) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        // Draw each line with random glitch effect
        for (let i = 0; i < lines.length; i++) {
            const colors = ['#ff0000', '#00ff00', '#0000ff', 'black'];
            ctx.fillStyle = colors[i % colors.length];

            const offsetX = Math.random() * 10 - 5;
            const offsetY = Math.random() * 10 - 5;

            ctx.fillText(lines[i], textX + offsetX, textY + (i * (fontSize + 5)) + offsetY);
        }
    }

    // Draw background and text on canvas
    drawBackground();
    drawText();

    // Save canvas to PNG file
    const out = fs.createWriteStream(__dirname + '/bratCanvas.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    out.on('finish', async () => {
        // Convert the saved PNG file to sticker buffer
        let sticker = await new Sticker(__dirname + '/bratCanvas.png', {
            pack: 'Di buat oleh :',
            author: 'Unknown',
            type: 'full',
            quality: 100,
            background: 'transparent'
        }).toBuffer(); // Convert to buffer

        // Send the generated sticker
        await conn.sendFile(m.chat, sticker, 'sticker.webp', 'Gambar brat dengan efek glitch telah dibuat!', m);
    });
};

handler.help = ['brot ( Teks )'];
handler.tags = ['fun'];
handler.command = /^(brot)$/i;

module.exports = handler;