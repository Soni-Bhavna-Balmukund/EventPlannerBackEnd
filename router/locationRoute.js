const express = require('express')
const { createLocations, allLocation, updateLocation, deleteLocation } = require('../controler/locationController')
const router = express.Router()

router.post('/',createLocations)
router.get('/allLocation',allLocation)
router.put('/updateLocation/:id',updateLocation)
router.delete('/deleteLocation/:id',deleteLocation)

module.exports = router