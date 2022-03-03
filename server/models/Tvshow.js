const mongoose = require('mongoose')

const tvshowSchema = new mongoose.Schema({
    title: String,
    story : String,
    realseDate: String,
    genre: String,
    EpNumber: Number,
    DirectorId: String


})
 const Tvshow = mongoose.model('tvshow',tvshowSchema)
module.exports = Tvshow