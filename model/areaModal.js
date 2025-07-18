const mongoose = require('mongoose')

const areaModal =new mongoose.Schema({
    areaName:{
        type:String,
        unique:true,
    },
    city:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'locations'
    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'country'
    },
    state:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'state'
    },
},{timeStamps:true})

module.exports = mongoose.model('areaModal',areaModal)