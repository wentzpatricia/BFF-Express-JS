const axios = require("axios");
const { putUseCase } = require("../put-use-case");

jest.mock("axios");

describe("putUseCase", () => {
  const mockPutData = { title: "fooEDIT", body: "barEDIT", userId: 1 };

  it("deve retornar dados de sucesso quando a chamada for bem-sucedida", async () => {
    const mockResponse = { data: { id: 1, ...mockPutData } };

    axios.put.mockResolvedValue(mockResponse);

    const result = await putUseCase(mockPutData, 2);

    expect(axios.put).toHaveBeenCalledWith(
      `${process.env.URL_API}/posts/2`,
      mockPutData
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("deve lançar um erro quando a chamada falhar", async () => {
    axios.put.mockRejectedValue(new Error("Erro de rede"));

    await expect(putUseCase(mockPutData, 2)).rejects.toThrow(
      "Erro ao editar postagem"
    );
    expect(axios.put).toHaveBeenCalledWith(
      `${process.env.URL_API}/posts/2`,
      mockPutData
    );
  });
});
