const express = require('express')
const router = express.Router()
const category = require('../services/category')

/* GET category  */
router.get('/', async(req,res,next) => {
    try{
        res.status(200).json(await category.getCategories())
    }catch(err){
        res.status(418).send({
            message: err.toString()
        })
        console.log('Error while getting Category',err.toString())
        next(err)
    }
})

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