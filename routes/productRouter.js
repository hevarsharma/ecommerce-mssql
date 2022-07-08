const express = require('express');
const router = express.Router()
const appRoot = require('app-root-path');
const createProductdb  = require(appRoot + '/controllers/product/addProductController')
const getProductData = require('../controllers/product/getProductController')
const deleteProductdb = require('../controllers/product/deleteProductController')
const updateProductTitleDb = require('../controllers/product/updateProductTitleController')

const auth = require('../middleware/auth')


router.route('/products').get(auth, getProductData)    
router.route('/addProduct').post(auth, createProductdb);  
router.route('/deleteProduct/:prod_id').delete(auth, deleteProductdb);
router.route('/updateProductTitle/:prod_id').put(auth, updateProductTitleDb);


module.exports = router