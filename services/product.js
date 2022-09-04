const db = require('./db')

const getAllProduct = async() => {
    const rows = await db.query(`
        SELECT * FROM product
    `)

    return rows
}

const getProductByCategory = async(id) => {
    const rows = await db.query(`
        SELECT * FROM product WHERE category = ${id}
    `)

    return rows
}

const searchProduct = async(input) => {
    const rows = await db.query(`
        SELECT * FROM product where name like '%${input}%'
    `)

    return rows
}

module.exports = {
    getAllProduct,
    getProductByCategory,
    searchProduct
}