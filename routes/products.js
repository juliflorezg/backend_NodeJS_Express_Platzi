const express = require('express')
const router = express.Router()
const ProductsService = require('./../services/product.service')
const service = new ProductsService()

//enviar JSON como respuesta
router.get('/', (req, res) => {
  const products = service.find()
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

  const product = service.findOne(id)

  res.json(product)
})

//! poner este endpoint especifico debajo del dinámico de arriba es un error porque va a tomar filter como un id y va a retornar lo del endpoint de arriba.
// //! para que funcione, hay que poner el endpoint especifico arriba del dinámico.
//// app.get('/products/filter', (req, res) => {
////   res.send('Yo soy un filter')
//// })

router.post('/', (req, res) => {
  const body = req.body
  const productCreated = service.create(body)

  // si no ponemos un middleware en index.js, no va a mostrar la data
  res.status(201).json(productCreated)
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
