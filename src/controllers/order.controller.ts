import type { Request, Response } from 'express';
import OrderService from '../services/order.services.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

export const createOrder = async (req: Request, res: Response) => {
    const { id_client, products } = req.body;

    try {
        const result = await OrderService.createOrder(id_client, products);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(400).json({ message: error.message || 'Error creating order.' });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// Obtener pedidos (con filtros) / Obtain orders (with filters)
export const getOrders = async (req: Request, res: Response) => {
    const { id_client, id_product } = req.query;

    try {
        const orders = await OrderService.getOrders({
            id_client: id_client ? Number(id_client) : undefined,
            id_product: id_product ? Number(id_product) : undefined,
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders were found with the filters applied.' });
        }

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error when obtaining orders.', error });
    }
};
