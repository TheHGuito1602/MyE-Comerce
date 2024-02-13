const mongoose  = require('mongoose');

const pedidoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    descripcion: {
        type: String,
        required: [true, 'por favor ingrese una descripción']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Pedido', pedidoSchema)