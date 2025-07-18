const mongoose = require('mongoose')

const country = new mongoose.Schema({
    countryname:{
        type:String,
        unique:true,
    }
},{timestamps:true})
module.exports = mongoose.model('country',country)