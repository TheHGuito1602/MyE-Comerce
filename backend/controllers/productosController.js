const asyncHandler = require('express-async-handler')
const Producto = require('../models/productosModel')

const getProductos = asyncHandler( async(req,res) =>{
    const productos =await Producto.find({user: req.usuario.id});
    res.status(200).json(productos)
})

const createProductos = asyncHandler( async (req,res) =>{
    if(!req.body.descripcion){
        res.status(400)
        throw new Error('Por favor escriba una description');
    }
    const producto= await Producto.create({
        descripcion: req.body.descripcion,
        user: req.usuario.id
    })
    res.status(201).json(producto)
})

const updateProductos = asyncHandler( async(req,res) =>{
    const producto = await Producto.findById(req.params.id)

    if(!producto){
        res.status(400)
        throw new Error('Ese producto no existe')
    }
    
    if(producto.user.toString() !== req.usuario.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    }else{
        const productoUpdate = await Producto.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(productoUpdate)
    }
})

const deleteProductos = asyncHandler( async(req,res) =>{
    const producto = await Producto.findById(req.params.id)
    if(!producto){
        res.status(400)
        throw new Error('Ese producto no existe')
    }
    if(producto.user.toString() !== req.usuario.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    }else{
        await Producto.deleteOne(producto)
        res.status(200).json({id: req.params.id})
    }
})

module.exports={
    getProductos,
    createProductos,
    updateProductos,
    deleteProductos
}