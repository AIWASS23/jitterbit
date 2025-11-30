# jitterbit

API RESTful para gerenciamento de pedidos (CRUD) com PostgreSQL, JWT e documentação Swagger. A aplicação recebe o payload original do cliente, faz o mapeamento dos campos e persiste os dados na collection MongoDB no formato já preparado para consumo interno.

##  Visão geral
A API permite as operações abaixo:

| Operação | Endpoint          | Método | Descrição                                      |
|----------|-------------------|--------|------------------------------------------------|
| Criar    | /order            | POST   | Cria um novo pedido.                           |
| Buscar   | /order/:orderId   | GET    | Retorna um pedido pelo seu orderId.            |
| Listar   | /order/list       | GET    | Lista todos os pedidos.                        |
| Atualizar| /order/:orderId   | PUT    | Atualiza um pedido existente.                  |
| Deletar  | /order/:orderId   | DELETE | Remove o pedido.                               |
| Register | /auth/register    | POST   | Cria usuário.                                  |
| Login    | /auth/login       | POST   | Gera token JWT.                                |


## Comandos

Modo desenvolvedor
- npm run dev

Modo produção
- npm start

Rodar testes
- npm test