const path = require('path')
const route = require('express').Router()

const { createLogger, format, transports } = require('winston')


var logger = createLogger({
    transports: [
        new transports.File({
            filename: path.join(__dirname, "logs/error.log"),
            format: format.combine(format.simple(), format.timestamp(), format.printf(info => `[${info.level.toUpperCase()}](${info.timestamp}): ${info.message}`))
        })
    ]
})

route.post('/error', (req, res) => {
    manageErr(`[${req.connection.remoteAddress}]:${req.body.message}`, res)
})

route.post('/info', (req, res) => {
    manageInfo(`[${req.connection.remoteAddress}]:${req.body.message}`, res)
})

function manageErr(err, res) {
    logger.error(err.message || err.toString())
    if (res) res.sendStatus(500)
}

function manageInfo(err, res) {
    logger.info(err.message || err.toString())
    if (res) res.sendStatus(200)
}

module.exports = { manageErr, route , logger}