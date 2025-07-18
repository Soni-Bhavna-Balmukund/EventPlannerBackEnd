const countrymodal = require("../model/countrymodal")
const LocationModal = require("../model/LocationModal")
const stateModal = require("../model/stateModal")

//#region create location
const createLocations = async(req,res) => {
    try{
       const location= req.body

       if(!location){
        return res.status(400).json({status:false,data:{message:"Location not found"}})
       }

       const state=await stateModal.findById(location.state)
       if(!state ){
        return res.status(400).json({status:false,data:{message:"state not found"}})
       }
       const country = await countrymodal.findById(location.country)

       if( !country){
        return res.status(400).json({status:false,data:{message:"country not found"}})
       }

       const locationfield = {locationName:location.locationName,state:state._id,country:country._id}

       const dblocation = new LocationModal(locationfield)
       await dblocation.save()

       return res.status(200).json({status:true,data:{message:"Location Created Successfully",data:dblocation}})

    }
    catch(error){
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}

//#endregion

//#region read all location
const allLocation = async(req,res) =>{
    try{
      const  dblocation = await LocationModal.find().populate('state','sname').populate('country','countryname')
      if(!dblocation){
         return res.status(400).json({status:false,data:{message:"Location not found"}})
      }
       return res.status(200).json({status:true,data:{message:"All Locations",data:dblocation}})
    }
    catch(error){
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion

//#region update location
const updateLocation = async(req,res) =>{
    try{
        const location = req.body
        const id = req.params.id

        const locationfield =  {locationName:location.locationName,state:location.state,country:location.country}

        const dblocation = await LocationModal.updateOne({_id:id},locationfield)
         if(!location || dblocation.matchedCount===0){
        return res.status(400).json({status:false,data:{message:"Location not found"}})
       }
        return res.status(200).json({status:true,data:{message:"Location updated successfully",data:dblocation}})
    }
    catch(error){
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion

// #region delete location
const deleteLocation = async(req,res) =>{
    try{
        const id = req.params.id

        const dblocation=  await LocationModal.deleteOne({_id:id})

        if(dblocation.deletedCount===0){
            return res.status(400).json({ status: false, data: { message: "Location Not Valid" } })
        }
         return res.status(200).json({status:true,data:{message:"Delete Successfully",data:dblocation}})
    }
    catch(error){
         console.log(error)
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion
module.exports ={ createLocations,allLocation,updateLocation,deleteLocation}