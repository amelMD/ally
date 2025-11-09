/** !! THIS CODE GENERATE BY ALLY !! **/

/*
• THIS FITUR CREATED BY ALLY TEAM
• RODOTZ, PUTRAMODZ, ZALS
*/
let handler = async (m, { conn, text }) => {
    const quo = text || m.quoted?.text || m.quoted?.caption || null;
    if (!quo) return m.reply("Balas pesan dengan kode ESM yang ingin di-convert menjadi CJS.");

    try {
        const cjsCode = convertESMtoCJS(quo);
        if (!cjsCode || cjsCode.trim().length === 0) throw "Kode tidak valid atau tidak dapat di-convert.";

        await conn.reply(m.chat, cjsCode, m);
    } catch (error) {
        console.error('Error Convert Code ESM to CJS:', error);
        m.reply("Terjadi kesalahan saat mengonversi kode. Pastikan format ESM Anda benar.");
    }
};

function convertESMtoCJS(esmCode) {
    let cjsCode = esmCode.replace(/import\s+([a-zA-Z0-9{},\s*]+)\s+from\s+['"](.*)['"];?/g, (match, imports, module) => {
        if (imports.includes("{")) {
            const [defaultImport, namedImports] = imports.split("{");
            let result = '';
            if (defaultImport.trim()) {
                result += `const ${defaultImport.trim()} = require('${module}');\n`;
            }
            if (namedImports) {
                result += `const { ${namedImports.replace("}", "").trim()} } = require('${module}');`;
            }
            return result;
        } else {
            return `const ${imports.trim()} = require('${module}');`;
        }
    });

    cjsCode = cjsCode.replace(/export\s+default/g, 'module.exports =');

    cjsCode = cjsCode.replace(/export\s+async\s+function\s+([a-zA-Z0-9_]+)\s*([^)]*)\s*{/g, 'exports.$1 = async function ($2) {');

    cjsCode = cjsCode.replace(/export\s+function\s+([a-zA-Z0-9_]+)\s*([^)]*)\s*{/g, 'exports.$1 = function ($2) {');

    cjsCode = cjsCode.replace(/export\s+const\s+([a-zA-Z0-9_]+)\s+=/g, 'exports.$1 =');

    cjsCode = cjsCode.replace(/export\s*{\s*([^}]+)\s*};/g, (match, exportedVars) => {
        return exportedVars.split(',').map(variable => `exports.${variable.trim()} = ${variable.trim()};`).join('\n');
    });

    cjsCode = cjsCode.replace(/import(.*)/g, 'require($1)');

    return cjsCode;
}

handler.help = ['convertcjs'];
handler.tags = ['tools'];
handler.command = /^convertcjs|tocjs$/i;
handler.limit = true;

module.exports = handler;