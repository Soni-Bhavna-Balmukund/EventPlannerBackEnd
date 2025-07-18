const businessGroup = require("../model/businessGroup");

//#region add group
const addgroup = async(req,res) => {
    try{
        const group = req.body;
        console.log(group)

        if(!group){
            return res.status(400).json({status:false,data:{message:"business group not found"}})
        }

        const groupfields = {
            gname:group.gname,remark:group.remark
        }

        const existingGroup = await businessGroup.findOne({gname:group.gname})
        if(existingGroup){
            return res.status(400).json({status:false,data:{message:"Group already exist"}})
        }

        const dbgroup = new businessGroup(groupfields)

        await dbgroup.save()

        return res.status(200).json({status:true,data:{message:"added successfully",data:dbgroup}})


    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion

//#region read group
const getallgroup = async(req,res) =>{
    try{
        const group= await businessGroup.find()

        if(!group){
            return res.status(400).json({status:false,data:{message:"Groupdata not found"}})
        }

        return res.status(200).json({status:true,data:{message:"All Groupdata",data:group}})
    }
    catch(error){
        return res.status(500).json({status:false,data:{message:"Internal server error",data:error}})
    }
}
//#endregion

//#region update group
const updateGroup = async(req,res) => {
    try{
        const id = req.params.id
        const group = req.body

        const dbgroup = await businessGroup.updateOne({_id:id},{gname:group.gname,remark:group.remark})

        if(!group || dbgroup.matchedCount===0){
             return res.status(400).json({status:false,data:{message:"Group not found"}})
        }

        return res.status(200).json({status:true,data:{message:"Updated Successfully",data:dbgroup}})
    }
    catch(error){
        return res.status(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion

//#region delete group
const deleteGroup = async(req,res) =>{
    try{
        const id= req.params.id
        
        const dbgroup = await businessGroup.deleteOne({_id:id})
        if(dbgroup.deletedCount===0){
             return res.status(400).json({status:false,data:{message:"Group not found"}})
        }
        return res.status(200).json({status:true,data:{message:"Deleted SuccessFully",data:dbgroup}})
    }
    catch(error){
        return res.statua(500).json({status:false,data:{message:"internal server error",data:error}})
    }
}
//#endregion

module.exports = {addgroup,getallgroup,updateGroup,deleteGroup}