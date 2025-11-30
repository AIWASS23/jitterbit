const Joi = require('joi');

// Schema usado tanto para CREATE quanto para UPDATE
const itemSchema = Joi.object({
  idItem: Joi.string().required(),
  quantidadeItem: Joi.number().integer().min(1).required(),
  valorItem: Joi.number().precision(2).required(),
});

const orderSchema = Joi.object({
  numeroPedido: Joi.string().required(),
  valorTotal: Joi.number().precision(2).required(),
  dataCriacao: Joi.date().iso().required(),
  items: Joi.array().items(itemSchema).min(1).required(),
});

module.exports = { orderSchema };
