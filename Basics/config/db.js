const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://0.0.0.0:27017/men').then(()=>{
    console.log("Connected to data base successfully");
})

module.exports = connection;