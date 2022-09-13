/**
 * Funcion encargada de calcular la siguiente posición
 * para la paginación de los resultados
 * @param {int} currentPage - Pagina actual de resultados
 * @param {int} listPerPage - Numero de elementos a enlistar
 * @returns {int} Offset
 */
const getOffset = (currentPage = 1, listPerPage) => {
    return (currentPage - 1) * [listPerPage]
}

module.exports = {
    getOffset
}