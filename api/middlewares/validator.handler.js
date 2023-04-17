const boom = require('@hapi/boom')

// configuramos un middleware que sea dinámico
function validatorHandler(schema, property) {
  console.log('validatorHandler')

  // creador de un middleware
  return (req, res, next) => {
    const data = req[property] // req.body | req.params | req.query
    const { error } = schema.validate(data, { abortEarly: false })

    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
