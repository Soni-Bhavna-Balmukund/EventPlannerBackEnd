const JWT =require('jsonwebtoken');
const { JWT_SECRET } = require('../utility/config');
const usermodal = require('../model/usermodal');

const Auth =async(req,res,next) =>{
    try{
        //encrepted token
        const token = req.headers.authorization;
        console.log(token)

        if(!token || token===null){
            return res.status(400).json({status:false,data:{message:'Your token is null'}})
        }
        //decrept the token

        const user = JWT.verify(token,JWT_SECRET)
        console.log(user,'decoded')
        if(!user){
            return res.status(400).json({status:false,data:{message:'Invalide Token'}})
        }

        // const dbuser = await usermodal.findById({_id:user.id}).select('-password')

        
    const dbuser = await usermodal.findById(user.id)
      .select('-password')
      .populate('businessgroup', 'gname remark').populate('businesscategory',' cname gid remark').populate('country', 'countryname').populate('eventlocation', 'locationName state country').populate('state', 'sname countryid').populate('usertype', 'userrole')
    //   .populate("businessgroup", "gname")
    //   .populate("businesscategory", "cname gid")
    //   .populate("country", "countryname")
    //   .populate("state", "sname")
    //   .populate("usertype", "userrole");

        console.log(dbuser)
        if(!dbuser){
            return res.status(400).json({status:false,data:{message:'UnAuthorized Access'}})
        }

        req.user1 = dbuser
        next()
    }catch(error){
        console.log(error)
    }
}

module.exports = Auth