console.log('hellooooo')

const express = require('express')
const app = express()
const port = 3000
const appRoutes = require('./routes')

//definir ruta
app.get('/', (req, res) => {
  res.send('hola, mi servidor en express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('hola, soy una nueva rutaa')
})

//decirle que escuche en un puerto especifico
app.listen(port, () => {
  console.log('Escuchando en el puerto', port)
})

appRoutes(app)
