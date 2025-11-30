require('dotenv').config();
const app = require('./app');
const { connectDB, sequelize } = require('./database/db');

const PORT = process.env.PORT || 3000;

// Conecta ao PostgreSQL
// Sincroniza os modelos (cria tabelas, se ainda não existirem)
// Inicia o servidor HTTP

connectDB()
  .then(() => sequelize.sync())          // -> pode usar { force: false } ou { alter: true }
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
      console.log(`Docs Swagger: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Falha ao iniciar aplicação:', err);
    process.exit(1);
  });

