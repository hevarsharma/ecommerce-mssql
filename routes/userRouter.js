const express = require('express');
const router = express.Router()
const appRoot = require('app-root-path');
const { validate } = require("express-validation")
const createUserdb  = require(appRoot + '/controllers/user/addUserController')
const getUserData = require('../controllers/user/userController')
const loginUserdb = require('../controllers/user/loginUserController');
const createUserSchema = require('../schemas/createUserSchema') //showing validation error....


router.route('/users').get(getUserData)    
router.route('/addUsers').post(createUserdb);  
router.route('/loginUser').post(loginUserdb); 

module.exports = router