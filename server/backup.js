const exec = require('child-process-async').exec;

var sleep = (seg) => new Promise(res => { setTimeout(() => { res() }, seg * 1000) })

async function backup() {
    let ip_backup = process.env.IP_BACKUP
    while (true) {
        await sleep(300) // cada 5 min para prueba
        try { await exec(`sh backup.sh ${ip_backup}`) }
        catch { }
    }
}

module.exports = backup