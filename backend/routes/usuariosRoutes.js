const express = require('express')
const router = express.Router()
const { crearUsuario, loginUsuario, datosUsuario } = require('../controllers/usuariosController')
const { protect }=require('../middleware/authMiddleWare')

router.post('/', crearUsuario)
router.post('/login', loginUsuario)
router.get('/datos', protect, datosUsuario)

module.exports = router