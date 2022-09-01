const db = require('./db')

const getCategories = async() => {
    const rows = await db.query(`
        SELECT * FROM category
    `)

    return rows
}

const getCategory = async(id) => {
    const rows = await db.query(`
        SELECT name FROM category where id = ${id}
    `)

    return rows
}

module.exports = {
    getCategories,
    getCategory
}