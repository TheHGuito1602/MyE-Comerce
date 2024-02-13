const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Usuario = require('../models/usuariosModel')

const crearUsuario = asyncHandler(async (req, res) => {

    //Desestructuramos el body
    const { name, email, password } = req.body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    //Verificar que ese usuario no exista a traves de su email 
    const usuarioExiste = await Usuario.findOne({ email })
    if (usuarioExiste) {
        res.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //Hacemos el HASH al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Crear el usuario
    const usuario = await Usuario.create({
        name,
        email,
        password: hashedPassword
    })

    if (usuario) {
        res.status(201).json({
            _id: usuario.id,
            name: usuario.name,
            email: usuario.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudieron guardar los datos')
    }

    //res.status(201).json({ message: 'Crear Usuario' })
})

const loginUsuario = asyncHandler(async (req, res) => {
    const  { email, password } = req.body;
    const usuario = await Usuario.findOne({ email});
    if(usuario && (await bcrypt.compare(password, usuario.password))){
        res.status(200).json({
            _id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token: generarToken(usuario.id)
        })
    }else{
        res.status(400);
        throw new Error('Datos de usuario incorrectos')
    }
})

const datosUsuario = asyncHandler(async (req, res) => {
    res.status(200).json(req.usuario)
})

const generarToken=(id_usuario)=>{
    return jwt.sign({id_usuario}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}
module.exports = {
    crearUsuario,
    loginUsuario,
    datosUsuario
}