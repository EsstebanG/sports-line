// Importamos modelos y dependencias principales / Import models and dependencies
import sequelize from '../dbconfig/connection.ts';

//
import { Order, OrderProduct, Product, Client } from '../models/relationship.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

export class OrderService {
    static async createOrder(id_client: number, products: { id_product: number; quantity: number }[]) {
        const t = await sequelize.transaction();

        try {
            // Validar cliente. / Validate client.
            const client = await Client.findByPk(id_client);
            if (!client) throw new Error('Client not found.');

            // Validar stock y calcular total. / Validate stock and calculate total.
            let total = 0;
            for (const item of products) {
                const product = await Product.findByPk(item.id_product);
                if (!product) throw new Error(`Product ${item.id_product} not found.`);
                if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}.`);

                total += Number(product.value) * item.quantity;
            }

            // Crear pedido. / Create order.
            const newOrder = await Order.create({ id_client, total }, { transaction: t });

            // Crear OrderProduct + actualizar stock. / Create OrderProduct + update stock.
            for (const item of products) {
                const product = await Product.findByPk(item.id_product);
                const subtotal = Number(product!.value) * item.quantity;

                await OrderProduct.create(
                {
                    id_order: newOrder.id_order,
                    id_product: item.id_product,
                    quantity: item.quantity,
                    subtotal,
                },
                { transaction: t }
                );

                await product!.update({ stock: product!.stock - item.quantity }, { transaction: t });
            }

            await t.commit();
            return { message: 'Order created successfully.', order: newOrder };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    // Obtener ordenes. / Obtain orders.
    static async getOrders(filters: { id_client?: number | undefined; id_product?: number | undefined }) {
        const { id_client, id_product } = filters;

        const where: any = {};

        if (id_client) where.id_client = id_client;
        if (id_product) where['$OrderProducts.id_product$'] = id_product;

        const orders = await Order.findAll({
            where,
            include: [
                {
                    association: 'OrderProducts',
                    include: ['Product'],
                },
                'Client',
            ],
        });

        return orders;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

export default OrderService;
