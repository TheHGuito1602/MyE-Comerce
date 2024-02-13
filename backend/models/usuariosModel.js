const mongoose = require('mongoose');
const usuarioSchema = mongoose.Schema({
  name: {
    type: String,
    require: [ true, "Por favor teclea tu nombre"]
  },
  email: {
    type: String,
    require: [ true, "Por favor teclea tu email"],
    unique: true
  },
  password: {
    type: String,
    require: [ true, "Por favor teclea tu password"]
  },
  esAdmin: {
    type: Boolean,
    default: false
  },
}, {
    timestamps: true
})

module.exports = mongoose.model('Usuario', usuarioSchema);