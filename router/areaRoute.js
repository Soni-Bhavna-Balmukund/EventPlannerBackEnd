const express = require('express')
const { addArea, readarea, updatearea, deletearea } = require('../controler/areaController')

const router = express.Router()

router.post('/',addArea)
router.get('/allArea',readarea)
router.put('/updateArea/:id',updatearea)
router.delete('/deleteArea/:id',deletearea)

module.exports = router