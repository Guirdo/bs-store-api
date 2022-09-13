const config = require('../config')
const { getOffset } = require('../helper')
const db = require('./db')

const getAllProduct = async (page = 1) => {
    const offset = getOffset(page, config.limitPerPage)
    const products = await db.query(`
        SELECT *
        FROM product
        LIMIT ${config.limitPerPage} OFFSET ${offset}
    `)

    const pagination = await getPagination(`
        SELECT count(*) as totalOfItems
        FROM product
    `, page)

    return { pagination, products }
}

const getProductByCategory = async (id, page = 1) => {
    const offset = getOffset(page, config.limitPerPage)
    const products = await db.query(`
        SELECT *
        FROM product 
        WHERE category = ${id}
        LIMIT ${config.limitPerPage} OFFSET ${offset}
    `)

    const pagination = await getPagination(`
        SELECT count(*) as totalOfItems
        FROM product 
        WHERE category = ${id}
    `, page)

    return { pagination, products }
}

const searchProduct = async (input, page = 1) => {
    const offset = getOffset(page, config.limitPerPage)
    let words = input.split(' ')
    let products
    let pagination

    if (words.length > 1) {
        products = await db.query(`
            SELECT *
            FROM product 
            WHERE name like '%${input}%'
            LIMIT ${config.limitPerPage} OFFSET ${offset}
        `)

        pagination = await getPagination(`
            SELECT count(*) as totalOfItems
            FROM product 
            WHERE name like '%${input}%'
        `, page)
    } else {
        products = await db.query(`
            SELECT *
            FROM product 
            WHERE name like '${input}%'
            LIMIT ${config.limitPerPage} OFFSET ${offset}
        `)

        pagination = await getPagination(`
            SELECT count(*) as totalOfItems
            FROM product 
            WHERE name like '${input}%'
        `, page)
    }

    return { pagination, products }
}

const getPagination = async (query, currentPage) => {
    const [{ totalOfItems }] = await db.query(query)
    const numberOfPages = Math.ceil(totalOfItems / config.limitPerPage)

    return {
        totalOfItems,
        limitPerPage: config.limitPerPage,
        currentPage: parseInt(currentPage),
        numberOfPages
    }
}

module.exports = {
    getAllProduct,
    getProductByCategory,
    searchProduct
}