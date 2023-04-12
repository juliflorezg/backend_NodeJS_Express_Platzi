const express = require('express')
const router = express.Router()
const ProductsService = require('../services/product.service')
const service = new ProductsService()

//enviar JSON como respuesta
router.get('/', async (req, res) => {
  const products = await service.find()
  res.json(products)
})

//* aquí arriba si funciona este endpoint
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
})

// dos puntos para decir que es un parámetro
// en este caso va a devolver el producto 1 con el id que le pasemos (hardcodeado, quemado)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await service.findOne(id)

    res.json(product)
  } catch (error) {
    next(error)
  }
})

//! poner este endpoint especifico debajo del dinámico de arriba es un error porque va a tomar filter como un id y va a retornar lo del endpoint de arriba.
// //! para que funcione, hay que poner el endpoint especifico arriba del dinámico.
//// app.get('/products/filter', (req, res) => {
////   res.send('Yo soy un filter')
//// })

router.post('/', async (req, res) => {
  const body = req.body
  const productCreated = await service.create(body)

  // si no ponemos un middleware en index.js, no va a mostrar la data
  res.status(201).json(productCreated)
})

router.patch('/:id', async (req, res) => {
  try {
    const body = req.body
    const { id } = req.params
    const updatedProduct = await service.update(id, body)

    res.json(updatedProduct)
  } catch (error) {
    res.status(404).json({
      message: error.message,
    })
  }
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deletedProduct = await service.delete(id)

  res.json(deletedProduct)
})

module.exports = router
