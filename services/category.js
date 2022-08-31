const db = require('./db')

const getCategories = async() => {
    const rows = await db.query(`
        SELECT * FROM category
    `)

    return rows
}

module.exports = {
    getCategories
}