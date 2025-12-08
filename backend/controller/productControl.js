const express = require('express');
const productmodules = require('../models/products');
const addtocardmodules = require('../models/addtocard');
// const { use } = require('react');
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

const addtocard = async (req , res) => {
    console.log(req.body);
    
    try{
        addtocardmodules.create(req.body)
        .then(()=>{res.json('success')})
        .catch((err) =>{res.json('error')})
    }
    catch (err){
        res.json(err);
    }
}

const getcard = async (req , res) =>{
    try{
        const getitem = await addtocardmodules.find()
        // .then(() =>{res.json(getitem)})
        // .catch((err) => {res.json(err)})
        res.json(getitem);
    }
    catch(err){
        res.json(err);
    }
}

const item = async (req,res) =>{
    const id = req.params.id;
    // const {productid} = id;
    try{
        const specificitem = await productmodules.findOne({id});
        res.json(specificitem);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {getproducts,addtocard,getcard,item};