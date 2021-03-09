const fs = require('fs')
const exec = require('child-process-async').exec;
const logger = require('./Logger').logger

var serverUrl = () => 'http://' + fs.readFileSync('./server_url.txt', { encoding: 'utf-8' }) + ':3000/'
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

function getNewIP() {
    let actual_ip = fs.readFileSync('./server_url.txt', { encoding: 'utf-8' }).split('.')
    actual_ip[actual_ip.length - 1] = parseInt(actual_ip[actual_ip.length - 1]) + 1
    return actual_ip.join('.')
}

async function request() {
    try {
        let { stdout } = await exec(`curl -o /dev/null -s -w %{size_download} -m 1 ${serverUrl()}`)
        return stdout !== '0'
    } catch { return false }
}

async function createInstance() {
    try {
        let instance_name = 'server_' + Date.now()
        let backup_ip = process.env.BACKUP_IP || '192.168.1.82'
        let new_ip = getNewIP()
        let { stdout } = await exec(`ssh root@${backup_ip} ls -t /db/backups/ | head -1 `)
        logger.info(`[Middle]: Creating instance... IP:${new_ip} NAME:${instance_name}`)
        logger.info(`[Middle]: Restaure data. FOLDER:${stdout.split('\n')[0]} FROM IP:${backup_ip}`)
        await exec(`sh createInstance.sh  ${instance_name} ${new_ip} ${stdout.split('\n')[0]} ${backup_ip} `)
        fs.writeFileSync('./server_url.txt', new_ip)
        logger.info(`[Middle]: New instance created!`)
    } catch (err) {
        logger.error(`[Middle]:${err.message||err.toString()}`)
    }
}

module.exports = { monitoring, serverUrl }