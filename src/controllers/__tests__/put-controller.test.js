const request = require("supertest");
const express = require("express");

jest.mock("../../services/put-service");

const service = require("../../services/put-service");
const putController = require("../put-controller");

const app = express();
app.use(express.json());
app.use("/", putController);

describe("PUT /edit-post/:id", () => {
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
  });

  it("deve retornar erro 422 se houver falha ao editar o post", async () => {
    service.putService.mockRejectedValue(new Error("Erro ao editar post"));

    const response = await request(app)
      .put(`/edit-post/${mockId}`)
      .send({ title: "Post inválido" });

    expect(response.status).toBe(422);
    expect(response.text).toBe("Erro ao editar post");
  });
});
