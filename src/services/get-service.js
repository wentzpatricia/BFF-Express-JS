const useCase = require("../use-cases/get-use-case");

getService = async () => {
  return await useCase.getUseCase();
};

module.exports = { getService };
