const db = require('./db')

const getAllProduct = async() => {
    const rows = await db.query(`
        SELECT * FROM product
    `)

    return rows
}

const getProductByCategory = async(id) => {
    console.log(id)
    const rows = await db.query(`
        SELECT * FROM product WHERE category = ${id}
    `)

    return rows
}

module.exports = {
    getAllProduct,
    getProductByCategory
}