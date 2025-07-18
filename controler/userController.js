const businessCategory = require('../model/businessCategory')
const businessGroup = require('../model/businessGroup')
const countrymodal = require('../model/countrymodal')
const LocationModal = require('../model/LocationModal')
const usermodal = require('../model/usermodal')
const stateModal = require('../model/stateModal')
const usertype = require('../model/usertype')
const { JWT_SECRET } = require('../utility/config')
const { Sendmail1 } = require('../utility/nodemailer')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

//#region add user
const adduser = async (req, res) => {
    try {
        const user = req.body
        console.log(user)
        console.log("Received user.usertype:", user.usertype);

        if (!user) {
            return res.status(400).json({ status: false, data: { message: 'user is null' } })
        }
        console.log("Password before hashing:", user.password)
        const hashpswd = await bcrypt.hash(user.password, 10)

        const usertypes = await usertype.findById(user.usertype)
        console.log(usertypes, 'userhg', user.usertype, 'gg', user.usertype.userrole, 'u', user.usertype)

        if (!usertypes) {
            return res.status(400).json({ message: "type not found" })
        }

        const existingemail = await usermodal.findOne({ email: user.email })
        if (existingemail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const country = await countrymodal.findById(user.country)

        if (!country) {
            return res.status(400).json({ message: "country not found" })
        }

        const state = await stateModal.findById(user.state)
        if (!state) return res.status(400).json({ message: "state not found" })

        const locations = await LocationModal.findById(user.locationName)
        if (!locations) {
            return res.status(400).json({ message: "Location not found" })
        }

        const userfields = {
            firstname: user.firstname, lastname: user.lastname, middlename: user.middlename, username: user.username, email: user.email, password: hashpswd,
            //  eventlocation:locations._id,
            country: country._id, eventdate: user.eventdate, phonenumber: user.phonenumber, businessname: user.businessname, usertype: usertypes._id, state: state._id, eventlocation: locations._id
        }



        if (user.usertype === '680e68965b145049fc075b4c') {
            if (!user.businessgroup || !user.businesscategory || !user.businessname) {
                return res.status(400).json({ status: false, message: 'businessgroup and businesscategory are required for vendors' });
            }
            const businessGroups = await businessGroup.findById(user.businessgroup)
            if (!businessGroups) {
                return res.status(400).json({ message: "Business Group not found" })
            }

            const businessCategories = await businessCategory.findById(user.businesscategory)
            if (!businessCategories) {
                return res.status(400).json({ message: "Business Category not found" })
            }
            userfields.businessgroup = businessGroups._id;
            userfields.businesscategory = businessCategories._id;
        }

        const dbuser = new usermodal(userfields)

        await dbuser.save()
        await Sendmail1(user.email, "Welcome", "", "<h1>Welcome to our EventPlanner Website</h1><p>Hope You Will Like Our Work </p>")
        return res.status(200).json({ status: true, data: { message: 'user created successfully', data: dbuser } })
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, data: { message: 'internal server error', data: error } })
    }
}
//#endregion

//#region Read user
const readuser = async (req, res) => {
    try {
        const dbuser = await usermodal.find().populate('usertype', 'userrole').populate('country', 'countryname')
        return res.status(200).json({ status: true, data: { message: 'all users', data: dbuser } })
    }
    catch (error) {
        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } })
    }
}
//#endregion

//#region update
const updateuser = async (req, res) => {
    try {
        const id = req.params.id
        const user = req.body

        if (!user) {
            return res.status(400).json({ status: false, data: { message: 'user is null' } })
        }

        // const userFields = {
        //     firstname: user.firstname, lastname: user.lastname, middlename: user.middlename, username: user.username, email: user.email, password: user.password, eventlocation: user.eventlocation, country: user.country, eventdate: user.eventdate, phonenumber: user.phonenumber, businessname: user.businessname, userrole: user.usertype,
        // }
          const userFields = {
      firstname: user.firstname,
      lastname: user.lastname,
      middlename: user.middlename,
      username: user.username,
      email: user.email,
      password: user.password,
      eventdate: user.eventdate,
      phonenumber: user.phonenumber,
      businessname: user.businessname,
      userrole: user.usertype?._id || user.usertype, // just the ID
      country: user.country?._id || user.country,
      state: user.state?._id || user.state,
      eventlocation: user.eventlocation?._id || user.eventlocation,
      businessgroup: user.businessgroup?._id || user.businessgroup,
      businesscategory: user.businesscategory?._id || user.businesscategory,
    };

        const dbuser = await usermodal.updateOne({ _id: id }, userFields)

        if (dbuser.matchedCount === 0) {
            return res.status(400).json({ status: false, data: { message: "User Not Valid" } })
        }

        return res.status(200).json({ status: true, data: { message: "Updated successfully", data: dbuser } })
    }
    catch (error) {
        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } })
    }
}
//#endregion

//#region Delete user
const deleteuser = async (req, res) => {
    try {
        const id = req.params.id
        dbuser = await usermodal.deleteOne({ _id: id })
        if (dbuser.deletedCount === 0) {
            return res.status(400).json({ status: false, data: { message: "user Not Valid" } })
        }
        return res.status(200).json({ status: true, data: { message: "Delete Successfully", data: dbuser } })
    } catch (error) {
        return res.status(500).json({ status: false, data: { message: "internal server error", data: error } })
    }
}
//#endregion
//#region login user
const loginuser = async (req, res) => {
    try {
        const user = req.body
        if (!user) { res.status(400).json({ status: false, data: { message: "user not found" } }) }

        const dbuser = await usermodal.findOne({ email: user.email }).populate('businessgroup', 'gname remark').populate('businesscategory',' cname gid remark').populate('country', 'countryname').populate('eventlocation', 'locationName state country').populate('state', 'sname countryid').populate('usertype', 'userrole')
        if (!dbuser) { res.status(400).json({ status: false, data: { message: "Email not found" } }) }

        console.log("Plain password from request:", user.password);
        console.log("Hashed password in DB:", dbuser.password);
        const verify = bcrypt.compareSync(user.password, dbuser.password)
        console.log('Password match:', verify);
        if (!verify) {
            return res.status(401).json({ status: false, data: { message: 'lnvalid password' } })
        }

        console.log(dbuser, 'dbuser')
        const token = JWT.sign({ id: dbuser._id }, JWT_SECRET)
        console.log(token, 'df')
        return res.status(200).json({ status: true, data: { messaage: "login successfully", data: dbuser, token: token } })
    }

    catch (error) {
        console.log(error)

        return res.status(500).json({ status: false, data: { message: "Internal server error", data: error } })
    }

}
//#endregion

//#region authVerify 
const AuthVerify = async (req, res) => {
    res.status(200).json({ status: true, data: { message: 'Authentication Verified', data: req.user1 } })
}
//#endregion

module.exports = { adduser, loginuser, AuthVerify, readuser, updateuser, deleteuser }