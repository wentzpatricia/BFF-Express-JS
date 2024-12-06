const useCase = require("../../use-cases/put-use-case");
const { putService } = require("../put-service");

jest.mock("../../use-cases/put-use-case");

describe("putService", () => {
  it("deve retornar os dados quando o useCase for bem-sucedido", async () => {
    const mockData = { title: "foo edit", body: "bar edit", userId: 1 };
    useCase.putUseCase.mockResolvedValue(mockData, 2);

    const result = await putService(mockData, 2);

    expect(result).toEqual(mockData, 2);
    expect(useCase.putUseCase).toHaveBeenCalled();
  });

  it("deve lançar um erro quando o useCase falhar", async () => {
    const mockData = { title: "foo", body: "bar", userId: 1 };

    useCase.putUseCase.mockRejectedValue(new Error("Erro no useCase"));

    await expect(putService(mockData, 2)).rejects.toThrow("Erro no useCase");
    expect(useCase.putUseCase).toHaveBeenCalled();
  });
});
