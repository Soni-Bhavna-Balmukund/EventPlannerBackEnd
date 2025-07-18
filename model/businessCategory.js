const mongoose = require('mongoose')

const businesscategory = new mongoose.Schema({

    cname:{
        type:String,
        unique:true,
        required:true
    },
    remark:{
        type:String,
    },
    
    gid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'businessgroup'
    }

},{timestamps:true})
module.exports = mongoose.model('businesscategory',businesscategory)