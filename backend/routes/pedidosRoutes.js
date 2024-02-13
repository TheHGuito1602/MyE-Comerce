const express = require('express');
const router = express.Router();
const {getPedidos, createPedidos, updatePedidos, deletePedidos} = require('../controllers/pedidosController');
const {protect} = require('../middleware/authMiddleWare');

//router.route('/').get(protect, getPedidos).post(createPedidos)

router.get('/', protect, getPedidos);
router.post('/', protect, createPedidos);

//router.route('/:id').delete(deletePedidos).put(updatePedidos)
router.put('/:id', protect,updatePedidos);
router.delete('/:id', protect,deletePedidos);

module.exports = router