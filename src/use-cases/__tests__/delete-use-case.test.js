const axios = require("axios");
const { deleteUseCase } = require("../delete-use-case");

jest.mock("axios");

describe("deleteUseCase", () => {
  const mockId = 2;

  it("deve retornar sucesso ao deletar um post", async () => {
    const mockResponse = { message: "Post excluído com sucesso" };
    axios.delete.mockResolvedValue({ data: mockResponse });

    const result = await deleteUseCase(mockId);

    expect(result).toEqual(mockResponse);
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.URL_API}/posts/${mockId}`
    );
  });

  it("deve lançar um erro quando a chamada falhar", async () => {
    axios.delete.mockRejectedValue(new Error("Erro na API"));

    await expect(deleteUseCase(mockId)).rejects.toThrow(
      "Erro ao excluir postagem"
    );
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.URL_API}/posts/${mockId}`
    );
  });
});
