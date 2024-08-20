/*
   * Base Simpel
   * Created By Siputzx Production 
*/

require("./config")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const { remini, jarak, ssweb, tiktok, PlayStore, BukaLapak, pinterest, stickersearch, lirik } = require("./lib/scraper")
const { exec } = require("child_process")

module.exports = async (ptz, m) => {
try {
const body = (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) ? (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) : '';

const budy = (typeof m.text === 'string') ? m.text : '';
const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const sender = m.key.fromMe ? (ptz.user.id.split(':')[0]+'@s.whatsapp.net' || ptz.user.id) : (m.key.participant || m.key.remoteJid)
const botNumber = await ptz.decodeJid(ptz.user.id)
const senderNumber = sender.split('@')[0]
const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)


switch(command) {
   case "menu": case "help": case "tes":{
      const captionAll = `halo kak ${pushname}, ini adalah base bot, jadi fiturnya dikit.\n\n> Menu\n~ .ai`;
  
      // Mengirim pesan dengan contextInfo yang dimodifikasi
      ptz.sendMessage(m.chat, {
          text: captionAll,
          contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                  newsletterName: 'Sakura-MD',
                  newsletterJid: '120363287649217780@newsletter',
              },
              externalAdReply: {
                  title: 'tes',
                  body: 'tes',
                  thumbnailUrl: 'https://telegra.ph/file/1da33dd3138404fc6ed82.jpg',
                  sourceUrl: '',
                  mediaType: 1,
                  renderLargerThumbnail: true
              }
          }
      });
  }
  break;
  
case "ai":{
if (!text) return m.reply("Mau nanya apa sama ai")
let {data} = await axios.get("https://itzpire.site/ai/gpt-web?q=" + text); // api miftah api ku mati soalnya :v
m.reply(data.result);
}
break
case 'tiktok':
case 'tt': {
    if (args.length == 0) return m.reply(`Example: ${prefix + command} link lu`)
    
    // Mengambil data dari API
    let response = await axios.get(`https://api.junn4.my.id/download/tiktok?url=${args[0]}`);
    let res = response.data.result;

    // Mengirim video dengan kualitas 'Medium' dan audio
    ptz.sendMessage(m.chat, { video: { url: res.Medium.url }, caption: res.caption, fileName: `tiktok.mp4`, mimetype: 'video/mp4' }).then(() => {
        ptz.sendMessage(m.chat, { audio: { url: res.audio }, fileName: `tiktok.mp3`, mimetype: 'audio/mp4' })
    })
}
break
case 'tts': {
   if (args.length == 1) return m.reply(`Example: ${prefix + command} query`)

   // Mengambil data dari API
   let response = await axios.get(`https://api.junn4.my.id/search/tiktoksearch?query=${args[1]}`);
   let res = response.data.result;

   // Mengirim video tanpa watermark dan audio dari video tersebut
   ptz.sendMessage(m.chat, { 
       video: { url: res.no_watermark }, 
       caption: res.title, 
       fileName: `tiktok.mp4`, 
       mimetype: 'video/mp4' 
   }).then(() => {
       ptz.sendMessage(m.chat, { 
           audio: { url: res.music }, 
           fileName: `tiktok.mp3`, 
           mimetype: 'audio/mp4' 
       })
   })
}
break

default:
if (budy.startsWith('=>')) {
if (!isCreator) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return m.reply(bang)
}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))
}
}

if (budy.startsWith('>')) {
if (!isCreator) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

if (budy.startsWith('$')) {
if (!isCreator) return
exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}

} catch (err) {
console.log(util.format(err))
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
