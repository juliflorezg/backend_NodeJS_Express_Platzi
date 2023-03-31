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

//decirle que escuche en un puerto especifico
app.listen(port, () => {
  console.log('Escuchando en el puerto', port)
})
