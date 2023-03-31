console.log('hellooooo')

const express = require('express')
const app = express()
const port = 3000

//definir ruta
app.get('/', (req, res) => {
  res.send('hola, mi servidor en express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('hola, soy una nueva rutaa')
})

//enviar JSON como respuesta
app.get('/products', (req, res) => {
  res.json([
    {
      name: 'product 1',
      price: 500,
    },
    {
      name: 'product 2',
      price: 2000,
    },
  ])
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

//decirle que escuche en un puerto especifico
app.listen(port, () => {
  console.log('Escuchando en el puerto', port)
})
