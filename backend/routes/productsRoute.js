const express = require('express');
const router = express.Router();
const productControl = require('../controller/productControl');


router.get('/product', productControl.getproducts);

module.exports = router;