const mongoose = require('mongoose')

const note = mongoose.Schema({
    text: { type: String },
    date: { type: Date }
});

module.exports = Note = mongoose.model('note', note)