const express = require('express')
const productsRouter = require('./products')
const usersRouter = require('./users')
const categoriesRouter = require('./categories')

function appRoutes(app) {
  const router = express.Router()

  // lo siguiente equivale a http://localhost:3000/api/v1/categories
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
}

module.exports = appRoutes
