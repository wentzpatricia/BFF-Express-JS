const useCase = require("../../use-cases/delete-use-case");
const { deleteService } = require("../delete-service");

jest.mock("../../use-cases/delete-use-case");

describe("deleteService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockId = 2;

  it("deve retornar os dados quando o useCase for bem-sucedido", async () => {
    useCase.deleteUseCase.mockResolvedValue(mockId);

    const result = await deleteService(mockId);

    expect(result).toEqual(mockId);
    expect(useCase.deleteUseCase).toHaveBeenCalled();
  });

  it("Deve lançar erro 422 quando faltar id", async () => {
    await expect(deleteService()).rejects.toEqual({
      status: 422,
      message: "Id é obrigatório",
    });

    expect(useCase.deleteUseCase).not.toHaveBeenCalled();
  });

  it("Deve lançar erro quando não for status 422", async () => {
    const postData = { title: "foo", body: "bar", userId: 1 };
    const mockError = new Error("Erro ao realizar Delete");

    useCase.deleteUseCase.mockRejectedValue(mockError);

    await expect(deleteService(postData, 2)).rejects.toThrow(
      "Erro ao realizar Delete"
    );
  });
});
