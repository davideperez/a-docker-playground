import express from 'express'
import mongoose from 'mongoose'

// Schema

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String
}))

// Server creation

const app = express()

// Database connection

mongoose.connect('mongodb://david:password@mongoContainer01:27017/myapp?authSource=admin')

// Routes

app.get('/', async (_req, res) => {
  const animales = await Animal.find()
  return res.send(animales)
})

app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({
    tipo: 'Leon', 
    estado: 'Cazando'
  })
  return res.send('Leon Creado ok!')
})

app.get('/delete', async (_req, res) => {
  console.log('eliminando...')
  await Animal.deleteOne({
    tipo: 'Leon', 
    estado: 'Cazando'
  })
  return res.send('Se eleimino un Leon!')
})

// Server start

app.listen(3000, () => console.log('listening...'))




