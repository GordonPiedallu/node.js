const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

describe("API Products", () => {

    test("GET /api/products doit retourner 200", async () => {
        const response = await request(app)
            .get("/api/products");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /api/products doit créer un produit", async () => {
        const response = await request(app)
            .post("/api/products")
            .send({
                title: "Produit test Jest",
                description: "Description du produit test",
                image: "test.jpg",
                price: 25
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Produit test Jest");
        expect(response.body.description).toBe("Description du produit test");
        expect(response.body.image).toBe("test.jpg");
        expect(response.body.price).toBe(25);
    });

    test("GET /api/products/:id doit retourner 200 pour un produit existant", async () => {
        const response = await request(app)
            .get("/api/products/6a8f3b183cb072434a3e035f");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.title).toBe("Mon vélo modifié");
    });

    test("GET /api/products/:id doit retourner 404 si le produit n'existe pas", async () => {
        const response = await request(app)
            .get("/api/products/000000000000000000000000");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Produit non trouvé");
    });

    test("PUT /api/products/:id doit modifier un produit existant", async () => {
        const response = await request(app)
            .put("/api/products/6a8f3b183cb072434a3e035f")
            .send({
                title: "Mon vélo modifié",
                description: "Description modifiée",
                image: "velo-modifie.jpg",
                price: 80
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Mon vélo modifié");
        expect(response.body.description).toBe("Description modifiée");
        expect(response.body.image).toBe("velo-modifie.jpg");
        expect(response.body.price).toBe(80);
    });

    test("PUT /api/products/:id doit retourner 404 si le produit n'existe pas", async () => {
        const response = await request(app)
            .put("/api/products/000000000000000000000000")
            .send({
                title: "Produit inexistant",
                description: "Test",
                image: "test.jpg",
                price: 10
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Produit non trouvé");
    });

    test("DELETE /api/products/:id doit supprimer un produit existant", async () => {
        const createdProduct = await request(app)
            .post("/api/products")
            .send({
                title: "Produit à supprimer",
                description: "Produit créé pour le test DELETE",
                image: "delete-test.jpg",
                price: 15
            });

        expect(createdProduct.statusCode).toBe(201);

        const productId = createdProduct.body._id;

        const response = await request(app)
            .delete(`/api/products/${productId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Produit supprimé avec succès");
    });

    test("DELETE /api/products/:id doit retourner 404 si le produit n'existe pas", async () => {
        const response = await request(app)
            .delete("/api/products/000000000000000000000000");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Produit non trouvé");
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});