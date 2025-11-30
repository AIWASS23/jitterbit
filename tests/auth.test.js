const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/database/db");
const User = require("../src/models/userModel");

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Testes de autenticação", () => {

    test("Deve registrar um novo usuário", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                username: "user1",
                password: "123456"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message");
    });

    test("Deve fazer login com sucesso", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                username: "user1",
                password: "123456"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});
