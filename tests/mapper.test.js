const { mapOrderInput } = require("../src/utils/mapper");

describe("mapOrderInput()", () => {
  
  test("deve mapear corretamente o payload válido", () => {
    const input = {
      numeroPedido: "v10089015vdb-01",
      valorTotal: 250.75,
      dataCriacao: "2025-01-15T10:30:00Z",
      items: [
        {
          idItem: "10",
          quantidadeItem: 2,
          valorItem: 50.5
        },
        {
          idItem: "20",
          quantidadeItem: 3,
          valorItem: 25.0
        }
      ]
    };

    const result = mapOrderInput(input);

    expect(result).toEqual({
      orderId: "v10089015vdb-01",
      value: 250.75,
      creationDate: new Date("2025-01-15T10:30:00Z"),
      items: [
        { productId: 10, quantity: 2, price: 50.5 },
        { productId: 20, quantity: 3, price: 25.0 }
      ]
    });
  });

  test("deve lançar erro se numeroPedido estiver ausente", () => {
    const input = {
      valorTotal: 10,
      dataCriacao: "2024-01-01",
      items: [{ idItem: "1", quantidadeItem: 1, valorItem: 10 }]
    };

    expect(() => mapOrderInput(input)).toThrow("numeroPedido é obrigatório");
  });

  test("deve lançar erro se valorTotal estiver ausente", () => {
    const input = {
      numeroPedido: "ABC123",
      dataCriacao: "2024-01-01",
      items: [{ idItem: "1", quantidadeItem: 1, valorItem: 10 }]
    };

    expect(() => mapOrderInput(input)).toThrow("valorTotal é obrigatório");
  });

  test("deve lançar erro se dataCriacao estiver ausente", () => {
    const input = {
      numeroPedido: "ABC123",
      valorTotal: 123,
      items: [{ idItem: "1", quantidadeItem: 1, valorItem: 10 }]
    };

    expect(() => mapOrderInput(input)).toThrow("dataCriacao é obrigatório");
  });

  test("deve lançar erro se items não for array ou estiver vazio", () => {
    expect(() => mapOrderInput({
      numeroPedido: "ABC",
      valorTotal: 10,
      dataCriacao: "2024-01-01",
      items: []
    })).toThrow("items deve ser um array não vazio");

    expect(() => mapOrderInput({
      numeroPedido: "ABC",
      valorTotal: 10,
      dataCriacao: "2024-01-01",
      items: "não é array"
    })).toThrow("items deve ser um array não vazio");
  });

  test("deve converter idItem para número", () => {
    const input = {
      numeroPedido: "XYZ",
      valorTotal: 100,
      dataCriacao: "2024-02-01",
      items: [
        { idItem: "55", quantidadeItem: 1, valorItem: 20 }
      ]
    };

    const result = mapOrderInput(input);

    expect(result.items[0].productId).toBe(55);
    expect(typeof result.items[0].productId).toBe("number");
  });

});
