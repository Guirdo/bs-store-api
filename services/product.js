const config = require('../config')
const { getOffset } = require('../helper')
const db = require('./db')

/**
 * Función encargada de consultar la lista 
 * completa de los productos
 * @param {int} page - Pagina de los resultados obtenidos
 * @returns {Object} - Objeto con la paginación y los productos resultantes
 */
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

/**
 * Función encargada de consultar todos los productos
 * de una sola categoria
 * @param {int} id - Identificador unico de una categorias
 * @param {int} page - Pagina de los resultados
 * @returns {Object} - Objeto con la paginación y los productos resultantes
 */
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

/**
 * Función encargada de consultar los productos
 * cuyo nombre tenga alguna coincidencia con el termino de busqueda
 * @param {string} input  - Termino de busqueda
 * @param {int} page - Pagina de los resultados
 * @returns {Object} - Objeto con la paginación y los productos resultantes
 */
const searchProduct = async (input, page = 1) => {
    const offset = getOffset(page, config.limitPerPage)
    let words = input.split(' ')
    let products
    let pagination

    //Si el termino de busqueda esta compuesto por más de una palabra
    if (words.length > 1) {
        //Consultara los productos coincidan tanto atras como adelante
        //del termino del busqueda
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
    } else {//Si el termino de busqueda es de una sola palabra
        //Consultara los productos que tengan una coincidencia delantera
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

/**
 * Funcion encargada de obtener la información necesaria
 * para la paginación de los resultados
 * @param {string} query - Expresion SQL
 * @param {int} currentPage - Pagina de resultados
 * @returns {Object} - Información de paginación
 */
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