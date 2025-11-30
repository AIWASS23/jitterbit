const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/db');

class Order extends Model {}
Order.init(
  {
    orderId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true, // createdAt / updatedAt
  }
);

/* ---------- Model Item ---------- */
class Item extends Model {}
Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // FK para Order
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'orderId',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    timestamps: false,
  }
);

// Um Order tem vários Items ( Associações )
Order.hasMany(Item, {
  foreignKey: 'orderId',
  sourceKey: 'orderId',
  as: 'items',
  onDelete: 'CASCADE',
});
Item.belongsTo(Order, {
  foreignKey: 'orderId',
  targetKey: 'orderId',
  as: 'order',
});

module.exports = { Order, Item };
