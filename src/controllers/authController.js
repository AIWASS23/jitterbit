const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

/* ---------- REGISTER ---------- */
const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const err = new Error('username e password são obrigatórios');
      err.statusCode = 400;
      throw err;
    }

    const exists = await User.findOne({ where: { username } });
    if (exists) {
      const err = new Error('Usuário já existe');
      err.statusCode = 409;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ username, passwordHash });

    res.status(201).json({ message: 'Usuário criado', userId: user.id });
  } catch (err) {
    next(err);
  }
};

/* ---------- LOGIN ---------- */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const err = new Error('username e password são obrigatórios');
      err.statusCode = 400;
      throw err;
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      const err = new Error('Credenciais inválidas');
      err.statusCode = 401;
      throw err;
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      const err = new Error('Credenciais inválidas');
      err.statusCode = 401;
      throw err;
    }

    const payload = { sub: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
