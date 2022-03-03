const mongoose = require('mongoose')

const directorSchema = new mongoose.Schema({
    name: String,
    age : Number,
 
})
 const Director = mongoose.model('director',directorSchema)
module.exports = Director