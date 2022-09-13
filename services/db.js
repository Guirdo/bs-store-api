const mysql = require('mysql2/promise');
const config = require('../config');

/**
 * Función encargada de ejecutar una consulta en la base de datos
 * @param {string} sql - Expresion SQL
 * @param {*} params - Parametros
 * @returns {Array} - Arreglo con el resultado de la consulta SQL
 */
async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  //Cierre de la conexion
  connection.end()
  return results;
}

module.exports = {
  query
}