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

  if (id === '999') {
    res.status(404).json({
      message: 'not found',
    })
  } else {
    res.status(200).json({
      id,
      name: 'product 1',
      price: 500,
    })
  }
})

//! poner este endpoint especifico debajo del dinámico de arriba es un error porque va a tomar filter como un id y va a retornar lo del endpoint de arriba.
// //! para que funcione, hay que poner el endpoint especifico arriba del dinámico.
//// app.get('/products/filter', (req, res) => {
////   res.send('Yo soy un filter')
//// })

router.post('/', (req, res) => {
  const body = req.body

  // si no ponemos un middleware en index.js, no va a mostrar la data
  res.status(201).json({
    message: 'created',
    data: body,
  })
})

router.patch('/:id', (req, res) => {
  const body = req.body
  const { id } = req.params

  res.json({
    message: 'updated',
    data: body,
    id,
  })
})
router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    message: 'deleted',
    id,
  })
})

module.exports = router
