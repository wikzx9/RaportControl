const express = require('express')
const router = express.Router()
const authControler = require('../controller/authCon')


router.post('/',authControler.handleLogin)



module.exports = router;