const express = require('express')
const router = express.Router()
const product = require('../services/product')

/**
 * GET Obtiene la lista completa de productos disponibles
 */
router.get('/:page?', async(req,res,next) => {
    try{
        res.status(200).json(await product.getAllProduct(req.params.page))
    }catch(err){
        res.status(418).send({
            message: err.toString()
        })
        console.log('Error while getting Product',err.toString())
        next(err)
    }
})

/**
 * GET Obtiene productos que sean de cierta categoria 
 */
router.get('/category/:category/:page?', async(req,res,next) => {
    try{
        res.status(200).json(await product.getProductByCategory(req.params.category, req.params.page))
    }catch(err){
        res.status(418).send({
            message: err.toString()
        })
        console.log('Error while getting Product',err.toString())
        next(err)
    }
})

/**
 *  GET Busca un producto a partir de un termino de busqueda
 * */ 
router.get('/search/:input/:page?', async(req,res,next) => {
    try{
        res.status(200).json(await product.searchProduct(req.params.input, req.params.page))
    }catch(err){
        res.status(418).send({
            message: err.toString()
        })
        console.log('Error while getting Product',err.toString())
        next(err)
    }
})

module.exports = router