const countrymodal = require("../model/countrymodal")

//#region add country
const createCountry = async(req,res)=>{
    try{
        const country = req.body

        if(!country){
        return res.status(400).json({status:false,data:{message:"Country name not found"}})
        }

        const  countryfield = {countryname:country.countryname}

        const dbcountry = new countrymodal(countryfield)

        dbcountry.save()

        return res.status(200).json({status:true,data:{message:"Country added successfully",data:dbcountry}})
    }
    catch(error){
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion

//#region read counry
const readCountry = async(req,res) =>{
    try{
        const dbcountry = await countrymodal.find()
        if(!dbcountry){
             return res.status(400).json({status:false,data:{message:"Country not found"}})
        }
        return res.status(200).json({status:true,data:{message:"All Countries ",data:dbcountry}})
    }
    catch(error){
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion

//#region update country
const updateCountry = async(req,res) =>{
    try{
        const id = req.params.id
        const country = req.body

        const  countryfield = {countryname:country.countryname}
        
        const dbcountry = await countrymodal.updateOne({_id:id},countryfield)
         if(!country || dbcountry.matchedCount===0){
        return res.status(400).json({status:false,data:{message:"Country not found"}})
       }
        return res.status(200).json({status:true,data:{message:"Country updated Successfully ",data:dbcountry}})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion

//#region 
const deleteCountry = async(req,res) =>{
    try{
        const id = req.params.id
        const dbcountry = await countrymodal.deleteOne({_id:id})
        if(dbcountry.deletedCount===0){
             return res.status(400).json({status:false,data:{message:"Country not found"}})
        }
         return res.status(200).json({status:true,data:{message:"Country deleted Successfully ",data:dbcountry}})
    }   
    catch(error){
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion
module.exports={createCountry,readCountry,updateCountry,deleteCountry}