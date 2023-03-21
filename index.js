console.log('hellooooo')

const express = require('express')
const app = express()
const port = 3000

//definir ruta
app.get('/', (req, res) => {
  res.send('hola, mi servidor en express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('hola, soy una nueva rutaa')
})

//enviar JSON como respuesta
app.get('/products', (req, res) => {
  res.json({
    name: 'product 1',
    price: 500,
  })
})

//decirle que escuche en un puerto especifico
app.listen(port, () => {
  console.log('Escuchando en el puerto', port)
})
