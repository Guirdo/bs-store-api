const express = require('express')
const app = express();
const mysql = require('mysql2')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const config = require('./config')
require('dotenv').config()

//Declaración del puerto a ocupar
const port = process.env.PORT || 3000;

//Uso de middlewares necesarios de Express
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Middleware para el control del acceso al consumo de la API
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

//Creación para la conexion a la base de datos
const pool = mysql
 .createPool(config.db)
  .promise();

//Declaración de la ruta principal de la API
app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

//Declaración de las rutas para cada entidad de la base de datos
app.use("/category", categoryRouter);
app.use("/product",productRouter)

//Middleware encargado de manejar los errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port);