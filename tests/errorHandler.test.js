const errorHandler = require("../src/middlewares/errorHandler");

describe("Middleware errorHandler", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {}); // silencia console.error nos testes
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve retornar 400 em erros de validação Joi", () => {
    const joiError = {
      isJoi: true,
      details: [{ message: '"username" is required' }],
    };

    errorHandler(joiError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Invalid request payload",
      details: ['"username" is required'],
    });
  });

  test("deve retornar o status code definido no erro customizado", () => {
    const customError = {
      statusCode: 409,
      message: "Usuário já existe",
    };

    errorHandler(customError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Usuário já existe",
    });
  });

  test("deve retornar 500 em erro genérico sem statusCode", () => {
    const genericError = new Error("Algo deu errado");

    errorHandler(genericError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Algo deu errado",
    });
  });

  test("deve retornar 500 com 'Internal Server Error' se a mensagem estiver ausente", () => {
    const noMessageError = {};

    errorHandler(noMessageError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });
});
