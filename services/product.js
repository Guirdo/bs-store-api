const config = require('../config')
const { getOffset } = require('../helper')
const db = require('./db')

const getAllProduct = async (page = 1) => {
    const offset = getOffset(page, config.limitPerPage)
    const rows = await db.query(`
        SELECT * FROM product
        LIMIT ${config.limitPerPage} OFFSET ${offset}
    `)

    return rows
}

const getProductByCategory = async (id, page = 1) => {
    const offset = getOffset(page, config.limitPerPage)
    const rows = await db.query(`
        SELECT * FROM product WHERE category = ${id}
        LIMIT ${config.limitPerPage} OFFSET ${offset}
    `)

    return rows
}

const searchProduct = async (input,page = 1) => {
    const offset = getOffset(page, config.limitPerPage)
    let words = input.split(' ')
    let rows
    
    if (words.length > 1) {
        rows = await db.query(`
            SELECT * FROM product where name like '%${input}%'
            LIMIT ${config.limitPerPage} OFFSET ${offset}
        `)
    } else{
        rows = await db.query(`
            SELECT * FROM product where name like '${input}%'
            LIMIT ${config.limitPerPage} OFFSET ${offset}
        `)
    }

    return rows
}

module.exports = {
    getAllProduct,
    getProductByCategory,
    searchProduct
}