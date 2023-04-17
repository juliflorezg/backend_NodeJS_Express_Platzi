console.log('hellooooo')

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const appRoutes = require('./routes')
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler')

// definir middleware para que muestre la info por POST
// una vez hecho esto, ya va a salir la info en Insomnia
app.use(express.json())

// usar cors
const whitelist = ['http://localhost:8000', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  },
}

app.use(cors(options))

// definir ruta
app.get('/api', (req, res) => {
  res.send('hola, mi servidor en express')
})

app.get('/api/nueva-ruta', (req, res) => {
  res.send('hola, soy una nueva rutaa')
})

// decirle que escuche en un puerto especifico
app.listen(port, () => {
  console.log('Escuchando en el puerto', port)
})

appRoutes(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
