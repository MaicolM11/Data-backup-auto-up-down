const express = require('express')
const axios = require('axios')

const monitor = require('./monitoring').monitoring
const serverUrl = require('./monitoring').serverUrl


var app = express()
var port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    axios.get(serverUrl(), (err, response) => {
        if (err) res.sendStatus(500)
        res.json(response.data)
    })
})

app.post('/', (req, res) => {
    axios.post(serverUrl(), req.body)
        .then(resp => res.sendStatus(resp.statusCode))
        .catch(error => res.sendStatus(500))
})

app.listen(port, () => {
    console.log(`Middleware is running on port ${port}`);
    monitor()
})