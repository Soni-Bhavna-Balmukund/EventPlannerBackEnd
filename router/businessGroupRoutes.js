const express = require('express')
const { addgroup, getallgroup, updateGroup, deleteGroup } = require('../controler/businessgroupController')
const router = express.Router()


router.post('/',addgroup)
router.get('/allgroup',getallgroup)
router.put('/updateGroup/:id',updateGroup)
router.delete('/deleteGroup/:id',deleteGroup)

module.exports= router