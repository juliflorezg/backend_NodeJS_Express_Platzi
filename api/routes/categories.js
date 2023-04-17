const express = require('express')
const router = express.Router()
const CategoryService = require('./../services/categories.service')
const category = new CategoryService()

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId,
  })
})

router.get('/', (req, res) => {
  const categories = category.find()

  res.json(categories)
})

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params

  const categoryFound = category.findCategory(categoryId)

  res.status(categoryFound.statusCode).send(categoryFound.json)
})

module.exports = router
