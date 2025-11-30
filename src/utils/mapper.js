/**
 * Converte o payload de entrada (formato "frontend") para o formato que será
 * armazenado no banco (formato "backend").
 *
 * @param {Object} payload - JSON recebido no body da requisição
 * @returns {Object} objeto mapeado para ser salvo no MongoDB
 */

const mapOrderInput = (payload) => {
  // Garantimos que os campos obrigatórios existam antes de mapear
  if (!payload.numeroPedido) throw new Error('numeroPedido é obrigatório');
  if (!payload.valorTotal) throw new Error('valorTotal é obrigatório');
  if (!payload.dataCriacao) throw new Error('dataCriacao é obrigatório');
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error('items deve ser um array não vazio');
  }

  return {
    orderId: payload.numeroPedido,                         // v10089015vdb-01
    value: payload.valorTotal,
    creationDate: new Date(payload.dataCriacao),           // converte para Date
    items: payload.items.map((it) => ({
      productId: Number(it.idItem),                        // número inteiro
      quantity: it.quantidadeItem,
      price: it.valorItem,
    })),
  };
};

module.exports = { mapOrderInput };
