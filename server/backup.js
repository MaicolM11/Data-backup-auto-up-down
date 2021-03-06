const exec = require('child-process-async').exec;
const axios = require('axios');
var sleep = (seg) => new Promise(res => { setTimeout(() => { res() }, seg * 1000) })

async function backup() {
    let ip_backup = process.env.IP_BACKUP
    let ip_middleware=process.env.IP_MIDDLEWARE
    while (true) {
        await sleep(300) // cada 5 min para prueba
        try { 
            await exec(`sh backup.sh ${ip_backup}`) 
            axios.post(`${ip_middleware}info`,{message:"DB backup complete"})
        }
        catch {
            axios.post(`${ip_middleware}error`,{message:"DB backup hasn't been completed"})
        }
    }
}

module.exports = backup