const request = require("supertest");
const express = require("express");
const getController = require("../get-controller");
const service = require("../../services/get-service");

jest.mock("../../services/get-service");

const app = express();
app.use(express.json());
app.use("/api", getController);

describe("GET /api/list-posts", () => {
  it("deve retornar a lista de posts com sucesso", async () => {
    const mockData = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    service.getService.mockResolvedValue(mockData);

    const response = await request(app).get("/api/list-posts");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(service.getService).toHaveBeenCalled();
  });

  it("deve retornar erro 500 se o serviço falhar", async () => {
    service.getService.mockRejectedValue(new Error("Service error"));

    const response = await request(app).get("/api/list-posts");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Erro ao buscar dados");
    expect(service.getService).toHaveBeenCalled();
  });
});
