const express = require('express')
const router = express.Router()
const category = require('../services/category')

/**
 * GET Obtener la lista de categorias disponibles 
 */
router.get('/', async(req,res,next) => {
    try{
        //Si no existe algún error, devolvera la respuesta en forma JSON
        //y con un estatus HTTPResquest exitosos 
        res.status(200).json(await category.getCategories())
    }catch(err){
        //De lo contrario, mandara un mensaje con el motivo del error
        res.status(418).send({
            message: err.toString()
        })
        console.log('Error while getting Category',err.toString())
        next(err)
    }
})

/**
 * Get Obtener nombre de una categoria a partir de un ID
 */
router.get('/:id', async(req,res,next) => {
    try{
        res.status(200).json(await category.getCategory(req.params.id))
    }catch(err){
        res.status(418).send({
            message: err.toString()
        })
        console.log('Error while getting Category',err.toString())
        next(err)
    }
})

module.exports = router