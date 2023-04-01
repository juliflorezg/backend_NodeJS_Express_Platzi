const express = require('express')
const { faker } = require('@faker-js/faker')
const router = express.Router()

//enviar JSON como respuesta
router.get('/', (req, res) => {
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
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
})

// dos puntos para decir que es un parámetro
// en este caso va a devolver el producto 1 con el id que le pasemos (hardcodeado, quemado)
router.get('/:id', (req, res) => {
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

module.exports = router
