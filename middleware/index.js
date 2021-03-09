const express = require('express')
const axios = require('axios')
const cors = require('cors')

const monitor = require('./monitoring').monitoring
const serverUrl = require('./monitoring').serverUrl
const manageErr = require('./Logger').manageErr
const logger = require('./Logger').route

var app = express()
var port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))
app.use('/logs', logger)
app.use(cors())

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

app.listen(port, () => {
    console.log(`Middleware is running on port ${port}`);
    monitor()
})