const express = require('express')
const axios = require('axios')
const path = require('path');
const cors = require('cors');

const monitor = require('./monitoring').monitoring
const serverUrl = require('./monitoring').serverUrl

const logger = require('./Logger');

var app = express()
var port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.use(express.static('public'))

function manageErr(err, res) {
    logger.error(err.message||err.toString())
    if(res) res.sendStatus(500)
}

function manageInfo(err, res) {
    logger.info(err.message||err.toString())
    if(res) res.sendStatus(200)
}

app.get('/notes', (req, res) => {
    axios.get(serverUrl(), (err, response) => {
        if (err) manageErr(err,res)
        res.json(response.data)
    })
})

app.post('/notes', (req, res) => {
    axios.post(serverUrl(), req.body)
        .then(resp => res.sendStatus(resp.statusCode))
        .catch(error => manageErr(error,res))
})

app.post('/error', (req,res)=>{
    manageErr(`[${req.connection.remoteAddress}]:${req.body.message}`,res)
})

app.post('/info', (req,res)=>{
    manageInfo(`[${req.connection.remoteAddress}]:${req.body.message}`,res)
})

app.listen(port, () => {
    console.log(`Middleware is running on port ${port}`);
    monitor()
})

/**
 * [{"text":"Hacer trabajos","date":"1970-01-19T16:35:03.898Z"}]
[{"text":"Hacer trabajos","date":"1614403213"}]
 */