const fs = require('fs')
const exec = require('child-process-async').exec;

var serverUrl = () => fs.readFileSync('./server_url.txt')
var sleep = (seg) => new Promise(res => { setTimeout(() => { res() }, seg * 1000) })

async function monitoring() {
    while (true) {
        if (!(await request())) {
            await sleep(5)
            if (!(await request())) await createInstance();
        }
        await sleep(3)
    }
}

async function request() {
    try {
        let { stdout } = await exec(`curl -o /dev/null -s -w %{size_download} ${serverUrl()}`)
        return stdout !== '0'
    } catch { return false }
}

async function createInstance() {
    /*let new_ip = await exec('sh createInstance.sh').stdout
    serverUrl file = new_ip*/
    await sleep(10)
}

module.exports = { monitoring, serverUrl }