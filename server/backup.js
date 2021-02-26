const exec = require('child-process-async').exec;

var sleep = (seg) => new Promise(res => { setTimeout(() => { res() }, seg * 1000) })

async function backup() {
    while (true) {
        await sleep(300) // cada 5 min para prueba
        try { await exec('sh backup.sh') }
        catch { }
    }
}

module.exports = backup