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
  find() {
    return this.products
  }
  findOne(id) {
    const product = this.products.find(product => product.id === id)

    return product
  }
  update() {}
}

module.exports = ProductsService
