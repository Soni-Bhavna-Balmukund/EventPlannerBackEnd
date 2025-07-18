const stateModals = require("../model/stateModal")
const countrymodal = require('../model/countrymodal')
//#region add state
const addStates = async (req, res) => {
    try {

        const state = req.body
        if (!state || !state.countryid ) {
            return res.status(400).json({ status: false, data: { message: "state not found" } })
        }
        const country = await countrymodal.findById(state.countryid)
         if(!country){
        return res.status(400).json({status:false,message:'country not found'})
    }

        const statefield = { sname: state.sname, countryid: country._id }

        const dbstate = new stateModals(statefield)
        await dbstate.save()

        return res.status(200).json({ status: true, data: { message: 'State added Successfully', data: dbstate } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } })
    }
}
//#endregion

//#region read state
const readState = async (req, res) => {
    try {
        const dbstate = await stateModals.find().populate('countryid','countryname')
        return res.status(200).json({ status: true, data: { message: 'All states', data: dbstate } })
    }
    catch (error) {
        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } })
    }
}
//#endregion

//#region 
const updateState = async (req, res) => {
    try {
        const state = req.body
        const id = req.params.id


        const statefield = { sname: state.sname, countryid: state.countryid }

        const dbstate = await stateModals.updateOne({ _id: id }, statefield)
        if (!state || dbstate.matchedCount === 0) {
            return res.status(400).json({ status: false, data: { message: "state not found" } })
        }

        return res.status(200).json({ status: true, data: { message: 'Updated Successfully', data: dbstate } })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } })
    }
}
//#endregion

//#region 
const deleteState = async (req, res) => {
    try {
        const id = req.params.id

        const dbstate = await stateModals.deleteOne({ _id: id })

        if (dbstate.deletedCount === 0) return res.status(400).json({ status: false, data: { message: "state not found" } })

        return res.status(200).json({ status: true, data: { message: 'Deleted Successfully', data: dbstate } })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } })
    }
}
//#endregion
module.exports = { addStates, readState, updateState, deleteState }