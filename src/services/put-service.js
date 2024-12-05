const useCase = require("../use-cases/put-use-case");

const putService = async (postData, id) => {
  return useCase.putUseCase(postData, id);
};

module.exports = { putService };
