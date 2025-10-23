import { OrderService } from "../services/order.services.ts";
import { Order, OrderProduct, Product, Client } from "../models/relationship.ts";

jest.mock("../models/index.model");

describe("OrderService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debería crear una nueva orden", async () => {
        (Client.findByPk as jest.Mock).mockResolvedValue({ id_client: 1 });
        (Order.create as jest.Mock).mockResolvedValue({ id_order: 1 });
        (Product.findByPk as jest.Mock).mockResolvedValue({ id_product: 1, price: 100 });
        (OrderProduct.create as jest.Mock).mockResolvedValue(true);

        const orderData = {
            id_client: 1,
            products: [{ id_product: 1, quantity: 2 }],
        };

        const result = await OrderService.createOrder(orderData.id_client, orderData.products);

        expect(result).toHaveProperty("id_order");
        expect(Order.create).toHaveBeenCalled();
        expect(OrderProduct.create).toHaveBeenCalled();
    });
});
