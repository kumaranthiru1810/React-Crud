const express = require('express');
const router = express.Router();
const productControl = require('../controller/productControl');
const addtocardControl = require('../controller/productControl');
const getproductcard  = require('../controller/productControl');
// const specificitem = require('../controller/productControl');

router.get('/product', productControl.getproducts);
router.post('/addtocard', addtocardControl.addtocard);
router.get('/getcard', getproductcard.getcard);
router.get('/getaddtocardproduct/:id', getproductcard.item);

module.exports = router;