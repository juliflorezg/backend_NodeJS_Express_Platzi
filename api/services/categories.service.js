class CategoriesService {
  constructor() {
    this.categories = []
    this.generate()
  }

  generate() {
    this.categories = this.categories.concat([
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
    ])
  }

  find() {
    return this.categories
  }

  findCategory(id) {
    const category = this.categories.find(cat => cat.id === id)
    if (!category) {
      return {
        statusCode: 404,
        json: { message: "Couldn't find a category for the id requested" },
      }
    } else {
      return {
        statusCode: 200,
        json: category,
      }
    }
  }
}

module.exports = CategoriesService
