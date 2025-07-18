const mongoose = require('mongoose')

const location = new mongoose.Schema({
    locationName:{
        type:String,
        unique:true,
    },
    state:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'state'
    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"country"
    }
},{timestamps:true})

module.exports = mongoose.model('locations',location)