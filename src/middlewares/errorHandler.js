/**
 * Middleware de tratamento de erros.
 * Se o erro for de validação Joi, retornamos 400.
 * Caso contrário, 500 (erro interno) ou o código definido no erro.
 */

const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);

  // Joi validation error
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Invalid request payload',
      details: err.details.map((d) => d.message),
    });
  }

  // Erros customizados podem ter status definido
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
