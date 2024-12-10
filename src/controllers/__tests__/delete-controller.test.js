const request = require("supertest");
const express = require("express");

jest.mock("../../services/delete-service");

const service = require("../../services/delete-service");
const deleteController = require("../delete-controller");

const app = express();
app.use(express.json());
app.use("/", deleteController);

describe("DELETE /delete-post/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockId = "2";

  it("deve excluir um post com sucesso", async () => {
    service.deleteService.mockResolvedValue();

    const response = await request(app).delete(`/delete-post/${mockId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Post excluído!",
    });

    expect(service.deleteService).toHaveBeenCalledWith(mockId);
  });

  it("deve retornar erro customizado do serviço", async () => {
    const mockError = { status: 422, message: "Erro de validação" };

    service.deleteService.mockRejectedValue(mockError);

    const response = await request(app).delete(`/delete-post/${mockId}`);

    expect(response.status).toBe(422);
    expect(response.body).toEqual({ message: "Erro de validação" });
    expect(service.deleteService).toHaveBeenCalledTimes(1);
  });

  it("deve retornar erro 500 para erro inesperado", async () => {
    const mockError = new Error("Erro desconhecido");

    service.deleteService.mockRejectedValue(mockError);

    const response = await request(app).delete(`/delete-post/${mockId}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Erro interno do servidor",
    });
    expect(service.deleteService).toHaveBeenCalledTimes(1);
  });
});
