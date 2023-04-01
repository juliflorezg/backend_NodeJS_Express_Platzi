const express = require('express')
const router = express.Router()

router.get('/:categoryId/products/:productId', (req, res) => {
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

router.get('/', (req, res) => {
  res.json(hardCodedCategories)
})

router.get('/:categoryId', (req, res) => {
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

module.exports = router
