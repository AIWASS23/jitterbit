const express = require('express');
const router = express.Router();

const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const { authenticate } = require('../middlewares/authMiddleware'); // opcional

/**
 * Todas as rotas de pedido são protegidas por JWT.
 * Caso queira deixar a API aberta, remova a linha `authenticate`
 */
router.use(authenticate);

/**
 * @route POST /order
 * @desc Cria um novo pedido
 */
router.post('/', createOrder);

/**
 * @route GET /order/list
 * @desc Lista todos os pedidos
 */
router.get('/list', listOrders);

/**
 * @route GET /order/:orderId
 * @desc Busca pedido por orderId
 */
router.get('/:orderId', getOrderById);

/**
 * @route PUT /order/:orderId
 * @desc Atualiza pedido existente
 */
router.put('/:orderId', updateOrder);

/**
 * @route DELETE /order/:orderId
 * @desc Remove pedido
 */
router.delete('/:orderId', deleteOrder);

module.exports = router;
