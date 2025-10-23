import Client from './client.model.ts';
import Order from './order.model.ts';
import OrderProduct from './orderProduct.model.ts';
import Product from './product.model.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// Relaciones Cliente - Orden
Client.hasMany(Order, {
    foreignKey: 'id_client',
    onDelete: 'CASCADE',
});
Order.belongsTo(Client, {
    foreignKey: 'id_client',
    onDelete: 'CASCADE',
});

// Relaciones Orden - OrderProduct
Order.hasMany(OrderProduct, {
    foreignKey: 'id_order',
    onDelete: 'CASCADE',
});
OrderProduct.belongsTo(Order, {
    foreignKey: 'id_order',
    onDelete: 'CASCADE',
});

// Relaciones Producto - OrderProduct
Product.hasMany(OrderProduct, {
    foreignKey: 'id_product',
    onDelete: 'CASCADE',
});
OrderProduct.belongsTo(Product, {
    foreignKey: 'id_product',
    onDelete: 'CASCADE',
});

// Relaciones Many-to-Many (Orders <-> Products)
Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'id_order',
    otherKey: 'id_product',
});
Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'id_product',
    otherKey: 'id_order',
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

export { Client, Order, OrderProduct, Product };
