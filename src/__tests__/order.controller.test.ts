import request from "supertest";
import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.ts";

const app = express();
app.use(express.json());
app.post("/orders", createOrder);
app.get("/orders", getOrders);

describe("OrderController", () => {
    it("POST /orders - debería devolver 201", async () => {
        const res = await request(app)
        .post("/orders")
        .send({
            id_client: 1,
            products: [{ id_product: 1, quantity: 2 }],
        });
        expect(res.status).toBe(201);
    });

    it("GET /orders - debería devolver 200", async () => {
        const res = await request(app).get("/orders");
        expect(res.status).toBe(200);
    });
});
