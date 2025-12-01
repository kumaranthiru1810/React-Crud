const express = require('express');
const productmodules = require('../models/products');
express(express.json());

const getproducts = async (req , res) =>{
    try {
        const products = await productmodules.find();
        res.json(products);
    }
    catch (err) {
        res.json(err);
    }
}


module.exports = {getproducts};