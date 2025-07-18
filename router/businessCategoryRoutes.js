const express = require('express')
const { addcategory, readAllCategory, updateCategory, deleteCategory } = require('../controler/businessCategoryController')
const router = express.Router()

router.post('/',addcategory)
router.get('/allBusinessCategory',readAllCategory)
router.put('/updateCategory/:id',updateCategory)
router.delete('/deleteCategory/:id',deleteCategory)
module.exports = router