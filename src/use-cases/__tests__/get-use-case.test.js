const axios = require("axios");
const { getUseCase } = require("../get-use-case");

jest.mock("axios");

describe("getUseCase", () => {
  it("deve retornar os dados quando a requisição for bem-sucedida", async () => {
    const mockData = { id: 1, title: "Post 1" };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getUseCase();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.URL_API}/posts`);
  });

  it("deve lançar um erro quando a requisição falhar", async () => {
    axios.get.mockRejectedValue(new Error("Request failed"));

    await expect(getUseCase()).rejects.toThrow("Erro ao buscar dados da API");
  });
});
