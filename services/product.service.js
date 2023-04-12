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

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }

    this.products.push(newProduct)
    return newProduct
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000)
    })
  }
  async findOne(id) {
    // esto es para probar los middleware de tipo error:
    const name = this.getTotal()
    const product = this.products.find(product => product.id === id)

    return product
  }
  async update(id, changes) {
    const index = this.products.findIndex(product => product.id === id)

    if (index === -1) {
      throw new Error('product not found')
    }
    this.products[index] = { ...this.products[index], ...changes }

    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id)

    if (index === -1) {
      throw new Error('product not found')
    }
    this.products.splice(index, 1)

    return { id }
  }
}

module.exports = ProductsService
