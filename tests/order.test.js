const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/database/db");

let token;
let createdOrderId; // <- AGORA DEFINIDO

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // cria usuário
    await request(app).post("/auth/register").send({
        username: "tester",
        password: "123456"
    });

    // login
    const login = await request(app).post("/auth/login").send({
        username: "tester",
        password: "123456"
    });

    token = login.body.token;
});

afterAll(async () => {
    await sequelize.close();
});

describe("Testes da API de Pedidos", () => {

    test("Deve listar pedidos", async () => {
        const res = await request(app)
            .get("/order/list")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("Deve criar um pedido", async () => {
        const payload = {
            numeroPedido: "1001",
            valorTotal: 350.75,
            dataCriacao: "2024-01-01T10:00:00Z",
            items: [
                { idItem: "1", quantidadeItem: 2, valorItem: 100.5 },
                { idItem: "2", quantidadeItem: 1, valorItem: 150.0 }
            ]
        };

        const res = await request(app)
            .post("/order")
            .set("Authorization", `Bearer ${token}`)
            .send(payload);

        expect(res.statusCode).toBe(201);
        expect(res.body.orderId).toBe("1001");

        createdOrderId = res.body.orderId; // <-- SALVADO AQUI
    });

    test("Deve atualizar um pedido", async () => {
        const payloadUpdate = {
            numeroPedido: "1001",
            valorTotal: 400.00,
            dataCriacao: "2024-01-02T12:00:00Z",
            items: [
                { idItem: "3", quantidadeItem: 1, valorItem: 400.0 }
            ]
        };

        const res = await request(app)
            .put(`/order/${createdOrderId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(payloadUpdate);

        expect(res.statusCode).toBe(200);
        expect(res.body.value).toBe(400.0);
        expect(res.body.items.length).toBe(1);
    });

    test("Deve deletar um pedido", async () => {
        const res = await request(app)
            .delete(`/order/${createdOrderId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(204);
    });
});
