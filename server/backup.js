const exec = require('child-process-async').exec;
const axios = require('axios');

var ip_backup = process.env.IP_BACKUP
let url = `${process.env.ROUTE_MIDDLE}/logs/`

var sleep = (seg) => new Promise(res => { setTimeout(() => { res() }, seg * 1000) })

async function backup() {
    while (true) {
        await sleep(100) // cada 100 seg para prueba
        try {
            await exec(`sh backup.sh ${ip_backup}`)
            sendLogger('Database backup complete!', true)
        } catch { sendLogger("Database backup hasn't been completed", false) }
    }
}

function sendLogger(msg, success) {
    try { axios.post(url + (success ? 'info' : 'error'), { message: msg }) }
    catch { }
}

module.exports = backup