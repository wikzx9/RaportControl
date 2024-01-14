const express = require('express')
const router = express.Router();
const usersController = require('../controller/userCon')
const ROLES_LIST = require('../config/rolesList')
const verifyRoles = require('../middleware/verifyRoles')
const registerControler = require('../controller/registerCon')
const logoutControler = require('../controller/logoutCon')

router.get('/', usersController.showAllUsers)

router.post('/register', registerControler.handleNewUser) 

router.delete('/usun/:id', usersController.deleteUser)

router.put('/logout/:accToken', logoutControler.handleLogout)

module.exports = router;