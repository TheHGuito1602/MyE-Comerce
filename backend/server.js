const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/productos', require('./routes/productosRoutes'))
app.use('/api/pedidos', require('./routes/pedidosRoutes'))
app.use('/api/usuarios', require('./routes/usuariosRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor inicializado en el puerto ${port}`))