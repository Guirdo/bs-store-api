//Necesario para invocar las variables de entorno
require('dotenv').config()

//Objeto de configuración para la conexión de la base de datos
const config = {
    db:{
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    //Limite de elementos por pagina de resultados
    limitPerPage: 10,
}

module.exports = config