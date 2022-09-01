const express = require('express')
const router = express.Router()
const product = require('../services/product')

/* GET All products  */
router.get('/', async(req,res,next) => {
    try{
        res.status(200).json(await product.getAllProduct())
    }catch(err){
        res.status(418).send({
            message: "Something went wrong"
        })
        console.log('Error while getting Product',err.toString())
        next(err)
    }
})

/** GET Products by category */
router.get('/category/:category', async(req,res,next) => {
    try{
        res.status(200).json(await product.getProductByCategory(req.params.category))
    }catch(err){
        res.status(418).send({
            message: "Something went wrong"
        })
        console.log('Error while getting Product',err.toString())
        next(err)
    }
})

module.exports = router