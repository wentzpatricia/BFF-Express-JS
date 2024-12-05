const axios = require("axios");
const { postUseCase } = require("../post-use-case");

jest.mock("axios");

describe("postUseCase", () => {
  const mockPostData = { title: "foo", body: "bar", userId: 1 };

  it("deve retornar dados de sucesso quando a chamada for bem-sucedida", async () => {
    const mockResponse = { data: { id: 1, ...mockPostData } };

    axios.post.mockResolvedValue(mockResponse);

    const result = await postUseCase(mockPostData);

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.URL_API}/posts`,
      mockPostData
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("deve lançar um erro quando a chamada falhar", async () => {
    axios.post.mockRejectedValue(new Error("Erro de rede"));

    await expect(postUseCase(mockPostData)).rejects.toThrow(
      "Erro ao criar postagem"
    );
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.URL_API}/posts`,
      mockPostData
    );
  });
});
