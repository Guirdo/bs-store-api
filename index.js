const express = require('express')
const app = express();
const mysql = require('mysql2')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const config = require('./config')
require('dotenv').config()

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

const pool = mysql
 .createPool(config.db)
  .promise();

console.log(pool.getConnection())

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.use("/category", categoryRouter);
app.use("/product",productRouter)
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port);