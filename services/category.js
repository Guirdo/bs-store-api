const db = require('./db')

/**
 * Función que consulta en la base de datos 
 * todas las categorias disponibles
 * @returns {Array} - Lista de categorias
 */
const getCategories = async() => {
    const rows = await db.query(`
        SELECT * FROM category
    `)

    return rows
}

/**
 * Funcion que se encarga de consultar el nombre
 * de una categorias según su ID
 * @param {int} id - Identificador unico de una categoria
 * @returns {Array} - Lista de categorias
 */
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