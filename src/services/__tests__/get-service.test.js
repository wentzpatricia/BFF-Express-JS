const useCase = require("../../use-cases/get-use-case");
const { getService } = require("../get-service");

jest.mock("../../use-cases/get-use-case");

describe("getService", () => {
  it("deve retornar os dados quando o useCase for bem-sucedido", async () => {
    const mockData = { id: 1, title: "Post 1" };
    useCase.getUseCase.mockResolvedValue(mockData);

    const result = await getService();

    expect(result).toEqual(mockData);
    expect(useCase.getUseCase).toHaveBeenCalled();
  });

  it("deve lançar um erro quando o useCase falhar", async () => {
    useCase.getUseCase.mockRejectedValue(new Error("Erro no useCase"));

    await expect(getService()).rejects.toThrow("Erro no useCase");
    expect(useCase.getUseCase).toHaveBeenCalled();
  });
});
