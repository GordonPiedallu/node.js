const request = require("supertest");
const app = require("../../app");

describe("POST /api/orders", () => {

    test("doit refuser une commande sans token", async () => {

        const response = await request(app)
            .post("/api/orders")
            .send({
                productId: "000000000000000000000000",
                quantity: 1,
                totalPrice: 10
            });

        expect(response.statusCode).toBe(401);

    });

});