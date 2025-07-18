const usermodal = require("../model/usermodal")
const usertype = require("../model/usertype")

//#region create usertype
const addusertype = async (req, res) => {
    try {
        const type = req.body
        console.log(type, 'type')

        if (!type) {
            return res.status(400).json({ status: false, data: { message: "Type Not Valid" } })
        }

        const typefileds = {
            userrole: type.userrole
        }

        const userdb = new usertype(typefileds)
        await userdb.save()

        return res.status(200).json({ message: "Usertype careated successfully", data: userdb })
    }
    catch (error) {
        return res.status(500).json({ status: false, data: { message: "Internal Server Error", data: error } })
    }
}
//#endregion

//#region read all usertypes
const readusertypes = async (req, res) => {
    try {
        const userdb = await usertype.find()
        if (!userdb) {
            return res.status(400).json({ status: false, data: { message: "Type Not Valid" } })
        }
        return res.status(200).json({ status: true, data: { message: "All userstypes", data: userdb } })
    }
    catch (error) {
        return res.status(500).json({ ststus: false, data: { message: "internal server error", data: error } })
    }
}
// #endregion

//#region get usertype in from user table
const getUsertype = async (req, res) => {
    try {
        //    const userdb = await usertype.find()
        const userdb = await usermodal.aggregate([

            {
                $lookup: {
                    from: "usertypes",
                    localField: 'usertype',
                    foreignField: '_id',
                    as: 'usertypes'
                },

            },
            {
                $unwind: '$usertypes'
            },
            {
                $project: {
                    usertypes: '$usertypes.userrole'
                }
            }

        ])
        return res.status(200).json({ message: "All Usertypes", data: userdb })
    }
    catch (error) {
        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } })
    }
}
//#endregion

//#region update usertype
const updateUsertype = async (req, res) => {
    try {
        const id = req.params.id
        const type = req.body
        // if (!type) {
        //     return res.status(400).json({ status: false, data: { message: "Type Not Valid" } })
        // }
        const typefield = { userrole: type.userrole }
        const userdb = await usertype.updateOne({ _id: id }, typefield)

        if (!type || userdb.matchedCount === 0) {
            return res.status(400).json({ status: false, data: { message: "Type Not Valid" } })
        }
        return res.status(200).json({ status:true,data:{ message: "Usertype updated Successfully", data: userdb }})
    }
    catch (error) {
        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } })
    }
}
//#endregion

//#region delete usertype
const deleteUsertype = async (req, res) => {
    try {
        const id = req.params.id

        const userdb = await usertype.deleteOne({ _id: id })
        if (userdb.deletedCount === 0) {
            return res.status(400).json({ status: false, data: { message: "Type Not Found" } })
        }
        return res.status(200).json({ message: "Usertype deleted Successfully", data: userdb })
    }
    catch (error) {
        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } })
    }
}
//#endregion
module.exports = { addusertype, getUsertype, readusertypes, updateUsertype, deleteUsertype }