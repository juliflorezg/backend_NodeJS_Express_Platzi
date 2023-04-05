const { faker } = require('@faker-js/faker')

class ProductsService {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl(),
      })
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }

    this.products.push(newProduct)
    return newProduct
  }

  find() {
    return this.products
  }
  findOne(id) {
    const product = this.products.find(product => product.id === id)

    return product
  }
  update(id, changes) {
    const index = this.products.findIndex(product => product.id === id)

    if (index === -1) {
      throw new Error('product not found')
    }
    this.products[index] = { ...this.products[index], ...changes }

    return this.products[index]
  }

  delete(id) {
    const index = this.products.findIndex(product => product.id === id)

    if (index === -1) {
      throw new Error('product not found')
    }
    this.products.splice(index, 1)

    return { id }
  }
}

module.exports = ProductsService
