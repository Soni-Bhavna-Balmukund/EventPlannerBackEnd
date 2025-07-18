const express = require('express')
const { readState, addStates, updateState, deleteState } = require('../controler/stateController')
const router = express.Router()

router.post('/',addStates)
router.get('/readState',readState)
router.put('/updateState/:id',updateState)
router.delete('/deleteState/:id',deleteState)

module.exports = router