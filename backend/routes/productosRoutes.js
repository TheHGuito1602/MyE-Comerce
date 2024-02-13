const express = require('express');
const router = express.Router();
const {getProductos, createProductos, updateProductos, deleteProductos} = require('../controllers/productosController');
const {protect} = require('../middleware/authMiddleWare');

//router.route('/').get(protect, getProductos).post(createProductos)

router.get('/', protect, getProductos);
router.post('/', protect, createProductos);

//router.route('/:id').delete(deleteProductos).put(updateProductos)
router.put('/:id', protect,updateProductos);
router.delete('/:id', protect,deleteProductos);

module.exports = router