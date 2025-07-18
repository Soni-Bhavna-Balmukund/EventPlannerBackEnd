const express =  require('express')
const { addusertype, getUsertype, readusertypes, updateUsertype, deleteUsertype } = require('../controler/userTypeController')
const router = express.Router()

router.post('/',addusertype)
router.get('/getUsertypes',getUsertype)
router.get('/readUsertypes',readusertypes)
router.put('/updateUsertype/:id',updateUsertype)
router.delete('/deleteUsertype/:id',deleteUsertype)

module.exports = router