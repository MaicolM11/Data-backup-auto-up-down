const express = require('express')
const db = require('./db/connection')
const Note = require('./db/notes_model')
const backup = require('./backup')

var app = express()
var port = process.env.PORT || 4000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

db()

app.get('/', async (req, res) => {
    let result = await Note.find({}, { '_id': 0, '__v': 0 })
    res.send(result)
})

app.get('/test', (req, res)=> res.sendStatus(200))

app.post('/', async (req, res) => {
    try {
        let note = new Note(req.body)
        await note.save()
        res.sendStatus(200)
    } catch { res.sendStatus(500) }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    backup()
})