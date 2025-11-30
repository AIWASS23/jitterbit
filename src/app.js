// src/app.js
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');

const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

// IMPORTA os models (executa a definição + associações)
require('./models/orderModel');
require('./models/userModel');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/order', orderRoutes);

app.use(
    '/api-docs', 
    require('swagger-ui-express').serve, 
    require('swagger-ui-express').setup(require('./swagger/swagger.json'))
);

app.use(errorHandler);

module.exports = app;
