const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("../../app");

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /api/products", () => {

    test("doit retourner 200", async () => {

        const response = await request(app)
            .get("/api/products");

        expect(response.statusCode).toBe(200);

    });

});