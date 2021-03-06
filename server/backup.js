const exec = require('child-process-async').exec;
const axios = require('axios');

var ip_backup = process.env.IP_BACKUP
let url = `${process.env.ROUTE_MIDDLE}/logs/`

var sleep = (seg) => new Promise(res => { setTimeout(() => { res() }, seg * 1000) })

async function backup() {
    while (true) {
        await sleep(300) // cada 5 min para prueba
        try {
            await exec(`sh backup.sh ${ip_backup}`)
            sendLogger('DB backup complete', true)
        } catch { sendLogger("DB backup hasn't been completed", false) }
    }
}

function sendLogger(msg, success) {
    try { axios.post(url + success ? 'info' : 'error', { message: msg }) }
    catch { }
}

module.exports = backup