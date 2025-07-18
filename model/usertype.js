const mongoose = require('mongoose')

const usertype = mongoose.Schema({
    userrole:{
        type:String,
        unique:true,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model('usertype',usertype)