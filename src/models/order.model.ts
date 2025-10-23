import { DataTypes, Model } from 'sequelize';
import sequelize from '../dbconfig/connection.ts';

export class Order extends Model {
    declare id_order: number;
    declare id_client: number;
    declare total: number;
    declare created_at: Date;
}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id_client',
      },
      onDelete: 'CASCADE',
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: false,
  }
);

export default Order;
