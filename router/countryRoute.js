const express = require('express')
const { createCountry, readCountry, updateCountry, deleteCountry } = require('../controler/countryController')
const router = express.Router()

router.post('/',createCountry)
router.get('/allcountry',readCountry)
router.put('/updateCountry/:id',updateCountry)
router.delete('/deleteCountry/:id',deleteCountry)

module.exports = router