const mongoose = require('mongoose');

const uri = process.env.URL_DB || 'mongodb+srv://maicol:1234@cluster0.c7ppq.mongodb.net/lab3?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(uri, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    });
}

module.exports = connectDB;