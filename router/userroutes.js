const express = require('express')
const { adduser, loginuser, AuthVerify, readuser, updateuser, deleteuser } = require('../controler/userController')
const Auth = require('../middleware/authVerify')
const router = express.Router()

router.post('/',adduser)
router.post('/loginuser',loginuser)
router.post('/authverify',Auth,AuthVerify)
router.get('/readuser',readuser)
router.put('/updateuser/:id',updateuser)
router.delete('/deleteuser/:id',deleteuser)

module.exports = router