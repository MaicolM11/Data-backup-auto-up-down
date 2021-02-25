const exec = require('child-process-async').exec;

var sleep = (seg) => new Promise(res => { setTimeout(() => { res() }, seg * 1000) })

async function generateBackUp() {
    try {
        let { stdout } = await exec('sh backup.sh')
    } catch { }
}

async function backup(){
    while(true) {
        sleep(300) // cada 5 min para prueba
        await generateBackUp()
    }
}

module.exports = backup