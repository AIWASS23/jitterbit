const {Order, Item} = require('../models/orderModel');
const { mapOrderInput } = require('../utils/mapper');
const { orderSchema } = require('../validators/orderValidator');


/* ---------- CREATE ---------- */
const createOrder = async (req, res, next) => {
  try {
    await orderSchema.validateAsync(req.body);
    const data = mapOrderInput(req.body);

    const order = await Order.create(
      {
        orderId: data.orderId,
        value: data.value,
        creationDate: data.creationDate,
        items: data.items.map((it) => ({
          productId: it.productId,
          quantity: it.quantity,
          price: it.price,
        })),
      },
      {
        include: [{ model: Item, as: 'items' }],
      }
    );

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

/* ---------- READ (by ID) ---------- */
const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      where: { orderId },
      include: [{ model: Item, as: 'items' }],
    });

    if (!order) {
      const error = new Error('Pedido não encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};

/* ---------- LIST ---------- */
const listOrders = async (_req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Item, as: 'items' }],
      order: [['creationDate', 'DESC']],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

/* ---------- UPDATE ---------- */
const updateOrder = async (req, res, next) => {
  try {
    await orderSchema.validateAsync(req.body);
    const { orderId } = req.params;
    const data = mapOrderInput(req.body);

    const order = await Order.findOne({ where: { orderId } });
    if (!order) {
      const error = new Error('Pedido não encontrado');
      error.statusCode = 404;
      throw error;
    }

    // Atualiza colunas da ordem
    await order.update({
      value: data.value,
      creationDate: data.creationDate,
    });

    // Estratégia simples: remove itens antigos e insere os novos
    await Item.destroy({ where: { orderId } });
    await Item.bulkCreate(
      data.items.map((it) => ({
        orderId,
        productId: it.productId,
        quantity: it.quantity,
        price: it.price,
      }))
    );

    const updated = await Order.findOne({
      where: { orderId },
      include: [{ model: Item, as: 'items' }],
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/* ---------- DELETE ---------- */
const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const rowsDeleted = await Order.destroy({ where: { orderId } });

    if (!rowsDeleted) {
      const error = new Error('Pedido não encontrado');
      error.statusCode = 404;
      throw error;
    }

    // onDelete: 'CASCADE' cuida da remoção dos itens automaticamente
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
};
