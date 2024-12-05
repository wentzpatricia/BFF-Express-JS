const useCase = require("../../use-cases/post-use-case");
const { postService } = require("../post-service");

jest.mock("../../use-cases/post-use-case");

describe("postService", () => {
  it("deve retornar os dados quando o useCase for bem-sucedido", async () => {
    const mockData = { title: "foo", body: "bar", userId: 1 };
    useCase.postUseCase.mockResolvedValue(mockData);

    const result = await postService(mockData);

    expect(result).toEqual(mockData);
    expect(useCase.postUseCase).toHaveBeenCalled();
  });

  it("deve lançar um erro quando o useCase falhar", async () => {
    const mockData = { title: "foo", body: "bar", userId: 1 };

    useCase.postUseCase.mockRejectedValue(new Error("Erro no useCase"));

    await expect(postService(mockData)).rejects.toThrow("Erro no useCase");
    expect(useCase.postUseCase).toHaveBeenCalled();
  });
});
