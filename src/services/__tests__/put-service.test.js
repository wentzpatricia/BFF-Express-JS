const useCase = require("../../use-cases/put-use-case");
const { putService } = require("../put-service");

jest.mock("../../use-cases/put-use-case");

describe("putService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar sucesso quando os dados são válidos", async () => {
    const mockData = { title: "foo", body: "bar", userId: 1 };
    const mockResult = { id: 2, ...mockData };

    useCase.putUseCase.mockResolvedValue(mockResult);

    const result = await putService(mockData, 2);

    expect(result).toEqual(mockResult);
    expect(useCase.putUseCase).toHaveBeenCalledWith(mockData, 2);
  });

  it("Deve lançar erro 422 quando faltam campos obrigatórios", async () => {
    const invalidDataSets = [
      { title: "foo", body: "bar" },
      { body: "bar", userId: 1 },
      { title: "foo", userId: 1 },
    ];

    for (const data of invalidDataSets) {
      await expect(putService(data, 2)).rejects.toEqual({
        status: 422,
        message: "Title, body e userId são obrigatórios",
      });
    }

    expect(useCase.putUseCase).not.toHaveBeenCalled();
  });

  it("Deve lançar erro 422 quando faltar id", async () => {
    const invalidData = { title: "foo", body: "bar", userId: 2 };

    await expect(putService(invalidData, "")).rejects.toEqual({
      status: 422,
      message: "Id é obrigatório",
    });

    expect(useCase.putUseCase).not.toHaveBeenCalled();
  });

  it("Deve lançar erro quando não for status 422", async () => {
    const postData = { title: "foo", body: "bar", userId: 1 };
    const mockError = new Error("Erro ao realizar Put");

    useCase.putUseCase.mockRejectedValue(mockError);

    await expect(putService(postData, 2)).rejects.toThrow(
      "Erro ao realizar Put"
    );
  });
});
