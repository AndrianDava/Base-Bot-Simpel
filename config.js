/*
   * Base Simpel
   * Created By Siputzx Production 
*/


global.owner = [
  "212703897448", //ganti nomor owner
  "" //nomor owner kedua kalo ada
]


let fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})