const mongoose = require('mongoose')

const stateModals = new mongoose.Schema({
    sname:{
        type:String,
        unique:true,
        required:true,
    },
    countryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'country'
    }
},{timestamps:true}) 

module.exports = mongoose.model('state',stateModals)