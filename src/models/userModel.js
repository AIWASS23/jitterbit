// src/models/user.model.js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/db');

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = User;
