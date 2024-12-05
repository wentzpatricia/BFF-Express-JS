const request = require("supertest");
const express = require("express");

jest.mock("../../services/post-service");

const service = require("../../services/post-service");
const postController = require("../post-controller");

const app = express();
app.use(express.json());
app.use("/", postController);

describe("POST /create-posts", () => {
  it("deve criar um post com sucesso", async () => {
    const mockPostData = { title: "foo", body: "bar", userId: 1 };
    service.postService.mockResolvedValue(mockPostData);

    const response = await request(app)
      .post("/create-posts")
      .send(mockPostData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Post criado!",
      data: mockPostData,
    });
  });

  it("deve retornar erro 422 se houver falha ao criar o post", async () => {
    service.postService.mockRejectedValue(new Error("Erro ao criar post"));

    const response = await request(app)
      .post("/create-posts")
      .send({ title: "Post inválido" });

    expect(response.status).toBe(422);
    expect(response.text).toBe("Erro ao criar post");
  });
});
