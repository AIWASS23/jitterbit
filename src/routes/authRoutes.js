const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

/**
 * @route POST /auth/register
 * @desc Cria usuário
 */
router.post('/register', register);

/**
 * @route POST /auth/login
 * @desc Realiza login e devolve JWT
 */
router.post('/login', login);

module.exports = router;
