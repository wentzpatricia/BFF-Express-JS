const request = require("supertest");
const express = require("express");

jest.mock("../../services/put-service");

const service = require("../../services/put-service");
const putController = require("../put-controller");

const app = express();
app.use(express.json());
app.use(putController);

describe("PUT /edit-post/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPostData = { title: "foo edit", body: "bar-edit", userId: 1 };
  const mockId = "2";

  it("deve editar um post com sucesso", async () => {
    service.putService.mockResolvedValue(mockPostData);
    const response = await request(app)
      .put(`/edit-post/${mockId}`)
      .send(mockPostData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Post editado!",
      data: mockPostData,
    });

    expect(service.putService).toHaveBeenCalledTimes(1);
  });

  it("deve retornar erro customizado do serviço", async () => {
    const mockError = { status: 422, message: "Erro de validação" };

    service.putService.mockRejectedValue(mockError);

    const response = await request(app)
      .put(`/edit-post/${mockId}`)
      .send({ title: "Post inválido" });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({ message: "Erro de validação" });
    expect(service.putService).toHaveBeenCalledTimes(1);
  });

  it("deve retornar erro 500 para erro inesperado", async () => {
    const mockError = new Error("Erro desconhecido");

    service.putService.mockRejectedValue(mockError);

    const response = await request(app)
      .put(`/edit-post/${mockId}`)
      .send({ title: "Título", content: "Conteúdo" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Erro interno do servidor",
    });
    expect(service.putService).toHaveBeenCalledTimes(1);
  });
});
