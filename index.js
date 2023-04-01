console.log('hellooooo')

const express = require('express')
const app = express()
const port = 3000
const { faker } = require('@faker-js/faker')

//definir ruta
app.get('/', (req, res) => {
  res.send('hola, mi servidor en express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('hola, soy una nueva rutaa')
})

//enviar JSON como respuesta
app.get('/products', (req, res) => {
  const products = []
  const { size } = req.query
  const limit = size ?? 10

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.imageUrl(),
    })
  }
  res.json(products)
})

//* aquí arriba si funciona este endpoint
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter')
})

// dos puntos para decir que es un parámetro
// en este caso va a devolver el producto 1 con el id que le pasemos (hardcodeado, quemado)
app.get('/products/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'product 1',
    price: 500,
  })
})

//! poner este endpoint especifico debajo del dinámico de arriba es un error porque va a tomar filter como un id y va a retornar lo del endpoint de arriba.
// //! para que funcione, hay que poner el endpoint especifico arriba del dinámico.
//// app.get('/products/filter', (req, res) => {
////   res.send('Yo soy un filter')
//// })

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId,
  })
})

const hardCodedCategories = [
  {
    id: '10001',
    name: 'tech',
    products: [],
  },
  {
    id: '10002',
    name: 'home',
    products: [],
  },
  {
    id: '10003',
    name: 'kitchen',
    products: [],
  },
  {
    id: '10004',
    name: 'fitness',
    products: [],
  },
]

app.get('/categories', (req, res) => {
  res.json(hardCodedCategories)
})

app.get('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params

  const categoryRequested = hardCodedCategories.find(
    category => category.id === categoryId
  )

  if (!categoryRequested) {
    res.status(404).send({
      message: "couldn't find a category for the id requested",
    })
  } else {
    res.json(categoryRequested)
  }
})

// http://localhost:3000/users?limit=10&offset=200
app.get('/users', (req, res) => {
  const { limit, offset } = req.query

  if (limit && offset) {
    res.json({
      limit,
      offset,
    })
  } else {
    res.send('No hay parametros')
  }
})

//decirle que escuche en un puerto especifico
app.listen(port, () => {
  console.log('Escuchando en el puerto', port)
})
