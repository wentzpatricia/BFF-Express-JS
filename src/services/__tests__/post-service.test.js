const useCase = require("../../use-cases/post-use-case");
const { postService } = require("../post-service");

jest.mock("../../use-cases/post-use-case");

describe("postService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar sucesso quando os dados são válidos", async () => {
    const postData = { title: "foo", body: "bar", userId: 1 };
    const mockResult = { id: 1, ...postData };

    useCase.postUseCase.mockResolvedValue(mockResult);

    const result = await postService(postData);

    expect(result).toEqual(mockResult);
    expect(useCase.postUseCase).toHaveBeenCalledWith(postData);
  });

  it("Deve lançar erro 422 quando faltam campos obrigatórios", async () => {
    const invalidDataSets = [
      { title: "foo", body: "bar" },
      { body: "bar", userId: 1 },
      { title: "foo", userId: 1 },
    ];

    for (const data of invalidDataSets) {
      await expect(postService(data)).rejects.toEqual({
        status: 422,
        message: "Title, body e userId são obrigatórios",
      });
    }

    expect(useCase.postUseCase).not.toHaveBeenCalled();
  });

  it("Deve lançar erro quando não for status 422", async () => {
    const postData = { title: "foo", body: "bar", userId: 1 };
    const mockError = new Error("Erro ao realizar Post");

    useCase.postUseCase.mockRejectedValue(mockError);

    await expect(postService(postData)).rejects.toThrow(
      "Erro ao realizar Post"
    );
  });
});
