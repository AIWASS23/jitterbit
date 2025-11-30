const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    dialect: 'postgres',
    logging: false, // true para ver SQL no console
  }
);

/**
 * Testa a conexão e encerra o processo caso falhe.
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com PostgreSQL estabelecida');
  } catch (error) {
    console.error('Não foi possível conectar ao PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
