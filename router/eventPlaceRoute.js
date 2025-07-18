const express = require('express')
const { addPlace, readPlace } = require('../controler/eventPlacesController')
const upload = require('../utility/upload')
const router = express.Router()

router.post('/addplace',upload.array('image'),addPlace)
router.get('/allPlace',readPlace)

module.exports = router