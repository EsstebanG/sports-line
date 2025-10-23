import { DataTypes, Model } from 'sequelize';
import sequelize from '../dbconfig/connection.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

export class OrderProduct extends Model {
  declare id_order: number;
  declare id_product: number;
  declare quantity: number;
  declare subtotal: number;
}

OrderProduct.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    sequelize,
    tableName: 'order_products',
    timestamps: false,
  }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

export default OrderProduct;
