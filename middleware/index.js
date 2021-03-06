const express = require('express')
const axios = require('axios')
const cors = require('cors');

const monitor = require('./monitoring').monitoring
const serverUrl = require('./monitoring').serverUrl
const manageErr = require('./Logger').manageErr
const logger = require('./Logger').route

var app = express()
var port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('logs', logger)

app.get('/notes', (req, res) => {
    axios.get(serverUrl(), (err, response) => {
        if (err) manageErr(err, res)
        else res.json(response.data)
    })
})

app.post('/notes', (req, res) => {
    axios.post(serverUrl(), req.body)
        .then(resp => res.sendStatus(resp.statusCode))
        .catch(error => manageErr(error, res))
})

app.listen(port, () => {
    console.log(`Middleware is running on port ${port}`);
    monitor()
})