const code = 'module.exports = require("./dist/brux");'
const indexjs = require("path").resolve(process.cwd(),"indextest.js");

require("fs").writeFileSync(indexjs,code);
