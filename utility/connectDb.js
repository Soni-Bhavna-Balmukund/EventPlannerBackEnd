const { default: mongoose } = require('mongoose')
const {MONGODB_URL} = require('./config');
const usermodal = require('../model/usermodal');

const connectdb = async() => {
    try{
        await mongoose.connect(MONGODB_URL);
        console.log('Databse connectes successfully')
        usermodal;
    }
    catch(error){
        if(error.name==='MongooseServerSelectionError'){
            console.error('Error: Connection Refuse Plase check your port')
        }else{
            console.error('Error while connecting to database Server')
        }
       process.exit(1)
    }
}

module.exports = connectdb