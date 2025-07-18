const businessCategory = require("../model/businessCategory");
const businessGroup  = require('../model/businessGroup')

const addcategory = async(req,res) =>{
 try{
    const category = req.body;

    if(!category || !category.gid || !category.cname){
        return res.status(400).json({status:false,message:'category or group is missing'})
    }

    // const groupname = await businessGroup.findOne({gname:category.gid})
    const groupname = await businessGroup.findById(category.gid)
    console.log(groupname)
    if(!groupname){
        return res.status(400).json({status:false,message:'Groupname not found'})
    }

    const categoryfield = {
        cname:category.cname,remark:category.remark,gid:groupname._id
    }

    const dbcategory = new businessCategory(categoryfield)
    await dbcategory.save()

    return res.status(200).json({status:true,data:{message:"category added successfully",data:dbcategory}})
 }
 catch(error){
    return res.status(500).json({status:false,data:{message:'internal server error',data:error}})
}
}

//#region read category
const readAllCategory = async(req,res)=>{
    try{
        const catdb = await businessCategory.find().populate('gid', 'gname')

        return res.status(200).json({status:true,data:{message:"all category",data:catdb}})
    }
    catch(error){
        return res.status(500).json({status:false,data:{message:'internal server error',data:error}}) 
    }
}
//#endregion

//#region 
const updateCategory = async(req,res) =>{
    try{
        const category =req.body
        const id = req.params.id

        const categoryfield = {cname:category.cname,remark:category.remark,gid:category.gid}

        const catdb= await businessCategory.updateOne({_id:id},categoryfield)

         if(!category || catdb.matchedCount===0){
        return res.status(400).json({status:false,message:'Category not found'})
    }

         return res.status(200).json({status:true,data:{message:"Category updated successfully",data:catdb}})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false,data:{message:'internal server error',data:error}}) 
    }
}
//#endregion

//#region 
const deleteCategory = async(req,res) =>{
    try{
        const id = req.params.id
        const catdb = await businessCategory.deleteOne({_id:id})

        if(catdb.deletedCount===0 || !catdb){
             return res.status(400).json({status:false,data:{message:"Category not found"}})
        }
         return res.status(200).json({status:true,data:{message:"Category deleted successfully",data:catdb}})
    }
    catch(error){
        return res.status(500).json({status:false,data:{message:'internal server error',data:error}}) 
    }
}
//#endregion
module.exports = {addcategory,readAllCategory,updateCategory,deleteCategory}