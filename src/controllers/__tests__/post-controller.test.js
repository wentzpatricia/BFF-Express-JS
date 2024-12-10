const request = require("supertest");
const express = require("express");

jest.mock("../../services/post-service");

const service = require("../../services/post-service");
const postController = require("../post-controller");

const app = express();
app.use(express.json());
app.use(postController);

describe("POST /create-posts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um post com sucesso", async () => {
    const mockPostData = { title: "Título", content: "Conteúdo", userId: 1 };
    const mockResponse = { id: 1, ...mockPostData };

    service.postService.mockResolvedValue(mockResponse);

    const response = await request(app)
      .post("/create-posts")
      .send(mockPostData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Post criado!",
      data: mockResponse,
    });
    expect(service.postService).toHaveBeenCalledWith(mockPostData);
    expect(service.postService).toHaveBeenCalledTimes(1);
  });

  it("deve retornar erro customizado do serviço", async () => {
    const mockError = { status: 422, message: "Erro de validação" };

    service.postService.mockRejectedValue(mockError);

    const response = await request(app)
      .post("/create-posts")
      .send({ title: "" });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({ message: "Erro de validação" });
    expect(service.postService).toHaveBeenCalledTimes(1);
  });

  it("deve retornar erro 500 para erro inesperado", async () => {
    const mockError = new Error("Erro desconhecido");

    service.postService.mockRejectedValue(mockError);

    const response = await request(app)
      .post("/create-posts")
      .send({ title: "Título", content: "Conteúdo" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Erro interno do servidor",
    });
    expect(service.postService).toHaveBeenCalledTimes(1);
  });
});
