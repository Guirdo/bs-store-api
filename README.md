# BS Store API

## Indice
- [Resumen](#resumen)

## Resumen

Esta API fue realizada para la prueba técnica de BSale para el puesto de Desarrollador de software.

## Instalación

1. Clona este respositorio
``` 
git clone https://github.com/Guirdo/bs-store-api.git
```
2. Ejecuta el siguiente comando para instalar las dependencias
``` 
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
```
npm run start
```

## Entidades

Para esta API se trabajo con dos tablas de la base de datos proporcionada por BSale.

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
|id|Identificador único de la categoria (int)|
|name|Nombre de la categoria (varchar)|

## Endpoints

### GET lista de categorias
- ```/category``` retornará todas las categorias

**Parametros**

- No tiene

**Respuesta**
```
[{"id":1,"name":"bebida energetica"},{"id":2,"name":"pisco"},{"id":3,"name":"ron"},{"id":4,"name":"bebida"},{"id":5,"name":"snack"},{"id":6,"name":"cerveza"},{"id":7,"name":"vodka"}]
```

### GET una categoria
- ```/category/:id``` retornará la categoria que corresponda al ```id```

**Parametros**

- *id*: identificador único de la categoria

**Ejemplo**

- ```/category/2```

**Respuesta**
```
[{"name":"pisco"}]
```