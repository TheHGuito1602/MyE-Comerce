const asyncHandler = require('express-async-handler')
const Pedido = require('../models/pedidosModel')

const getPedidos = asyncHandler( async(req,res) =>{
    const pedidos =await Pedido.find({user: req.usuario.id});
    res.status(200).json(pedidos)
})

const createPedidos = asyncHandler( async (req,res) =>{
    if(!req.body.descripcion){
        res.status(400)
        throw new Error('Por favor escriba una description');
    }
    const pedido= await Pedido.create({
        descripcion: req.body.descripcion,
        user: req.usuario.id
    })
    res.status(201).json(pedido)
})

const updatePedidos = asyncHandler( async(req,res) =>{
    const pedido = await Pedido.findById(req.params.id)

    if(!pedido){
        res.status(400)
        throw new Error('Ese pedido no existe')
    }
    
    if(pedido.user.toString() !== req.usuario.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    }else{
        const pedidoUpdate = await Pedido.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(pedidoUpdate)
    }
})

const deletePedidos = asyncHandler( async(req,res) =>{
    const pedido = await Pedido.findById(req.params.id)
    if(!pedido){
        res.status(400)
        throw new Error('Ese pedido no existe')
    }
    if(pedido.user.toString() !== req.usuario.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    }else{
        await Pedido.deleteOne(pedido)
        res.status(200).json({id: req.params.id})
    }
})

module.exports={
    getPedidos,
    createPedidos,
    updatePedidos,
    deletePedidos
}