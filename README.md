# BS Store API

![bs-store-api](https://socialify.git.ci/Guirdo/bs-store-api/image?font=Raleway&language=1&name=1&owner=1&pattern=Circuit%20Board&theme=Light)

## Indice
- [Resumen](#resumen)
- [Instalacion](#instalacion)
- [Stack](#stack)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Entidades](#entidades)
    - [Product](#product)
    - [Category](#category)
- [Endpoints](#endpoints)
    - [GET lista de categorias](#get-lista-de-categorias)
    - [GET una categoria](#get-una-categoria)
    - [GET todos los productos](#get-todos-los-productos)
    - [GET obtener productos por categoría](#get-obtener-productos-por-categoria)
    - [GET buscar producto](#get-buscar-producto)
- [Licencia](#licencia)
- [Autor](#autor)

## Resumen

Esta API fue realizada para la prueba técnica de BSale para el puesto de Desarrollador de software.

En esta API se trabaja con las entidades Product y Category para realizar el filtrado y envío de datos para la aplicación front-end.

## Instalacion

1. Clona este repositorio
``` bash
git clone https://github.com/Guirdo/bs-store-api.git
```
2. Ejecuta el siguiente comando para instalar las dependencias
``` bash
npm install
```
3. Antes de ejecutar por primera vez el servidor, asegurate de crear un archivo ```.env``` con los siguientes campos:
```
DB_HOST=your-db-host.com
DB_USER=db-user
DB_PASSWORD=db-password
DB_NAME=db-name
```
4. Corre el siguiente comando
```bash
npm run start
```

## Stack
Estas son las tecnologías ocupadas para el desarrollo de la API
- NodeJS
- Express

## Estructura del proyecto

- ```routes/```: Enrutadores para cada endpoint
- ```services/```: Métodos que realizan las consultas y el control de errores para los enrutadores.
- ```config.js```: Configuración para la conexión de la base de datos
- ```helper.js```: Funciones utiles para el sistema
- ```vercel.json```: Archivo de configuración para el host de la API
- ```index.js```: Programa principal de la API.

## Entidades

Para esta API se trabajó con dos tablas de la base de datos proporcionada por BSale.

### Product

| Campo | Descripción  |
|---|---|
| id | Identificador único del producto (int)|
| name| Nombre del producto (varchar)|
|url_image | URL de la imagen asociada al producto (varchar)|
| price| Precio de venta del producto (float)|
|discount|Porcentaje de descuento del producto (int)|
|category|Identificador de la categoria (int)|

### Category

| Campo | Descripción  |
|---|---|
|id|Identificador único de la categoría (int)|
|name|Nombre de la categoria (varchar)|

## Endpoints

### GET lista de categorias
- ```/category/page``` retornará todas las categorias

**Parametros**

- No tiene

**Respuesta**
```json
[
    {"id":1,"name":"bebida energetica"},
    {"id":2,"name":"pisco"},
    {"id":3,"name":"ron"},
    {"id":4,"name":"bebida"},
    {"id":5,"name":"snack"},
    {"id":6,"name":"cerveza"},
    {"id":7,"name":"vodka"}
]
```

### GET una categoria
- ```/category/:id``` retornará la categoría que corresponda al ```id```

**Parametros**

- *id*: identificador único de la categoría

**Ejemplo**

- ```/category/2```

**Respuesta**
```json
[{"name":"pisco"}]
```

### GET todos los productos
- ```/product/:page``` retornará todos los productos disponibles.

Si el campo *page* se deja vacio mostrara la primera pagina de resultados.

**Parametros**

- *page*: Numero de la pagina de resultados (opcional)

**Ejemplo**

- ```/product```
- ```/product/2```

**Respuesta**
```json
{
    pagination: {
        totalOfItems: 57,
        limitPerPage: 10,
        currentPage: 2,
        numberOfPages: 6
    },
    products:[
        {
            "id":5,
            "name":"ENERGETICA MR BIG",
            "url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
            "price":1490,
            "discount":20,
            "category":1
        },
        ...
    ]
}
```

### GET obtener productos por categoría

- ```/product/category/:category/:page ``` retornará los productos según la categoría.

Si el campo *page* se deja vacio mostrara la primera pagina de resultados.

**Parametros**
- *category*: Identificador único de la categoría
- *page*: Numero de la pagina de resultados (opcional)

**Ejemplo**
- ```/product/category/3/2```

**Respuesta**
```json
{
    pagination: {
        totalOfItems: 13,
        limitPerPage: 10,
        currentPage: 2,
        numberOfPages: 2
    },
    products: [
        {
            "id":23,
            "name":"RON BACARDI AÑEJO",
            "url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/bacardi9450.jpg",
            "price":4990,
            "discount":0,
            "category":3
        },
    ...
    ]
}
```

### GET Buscar producto

- ```/product/search/:input/:page``` retornará los productos que coincidan (puede ser parcialmente) con el ```input```

Si el campo *page* se deja vacio mostrara la primera pagina de resultados.

**Parametros**
- *input*: término de búsqueda
- *page*: Numero de la pagina de resultados (opcional)

**Ejemplo**
- ```/product/search/r/2```
- ```/product/search/a```

**Respuesta**

```json
{
    pagination: {
        totalOfItems: 1,
        limitPerPage: 10,
        currentPage: 1,
        numberOfPages: 1
    },
    products:[
        {
            "id":104,
            "name":"ABSOLUT",
            "url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/absolut21381.png",
            "price":8990,
            "discount":30,
            "category":7
        }
    ]
}
```
## Licencia

> Este proyecto tiene una licencia MIT

## Autor

Hecho con :heart: por [Guirdo](https://github.com/Guirdo)
