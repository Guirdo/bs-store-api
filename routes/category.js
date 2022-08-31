const express = require('express')
const router = express.Router()
const category = require('../services/category')

/* GET category  */
router.get('/', async(req,res,next) => {
    try{
        res.json(await category.getCategories())
    }catch(err){
        console.log('Error while getting Category',err.toString())
        next(err)
    }
})

module.exports = router