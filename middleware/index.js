const express = require('express')
const axios = require('axios')
const morgan = require('morgan')

const monitor = require('./monitoring').monitoring
const serverUrl = require('./monitoring').serverUrl
const manageErr = require('./Logger').manageErr
const logger = require('./Logger')
var app = express()
var port = process.env.PORT

app.use(express.json())
app.use(express.static('public'))
app.use('/logs', logger.route)
app.use(morgan(':method :url - :referrer :status :response-time ms', { stream: logger.logger.stream }));

app.get('/notes', (req, res) => {
    axios.get(serverUrl())
        .then(resp => res.send(resp.data))
        .catch(error => manageErr(error, res))
})

app.post('/notes', (req, res) => {
    axios.post(serverUrl(), req.body)
        .then(resp => res.sendStatus(200))
        .catch(error => manageErr(error, res))
})

app.listen(port, async () => {
    logger.manageInfo(`[Middle]: Middleware is running on port ${port}`)
    monitor()
})