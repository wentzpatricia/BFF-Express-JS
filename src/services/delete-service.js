const useCase = require("../use-cases/delete-use-case");

const deleteService = async (id) => {
  return useCase.deleteUseCase(id);
};

module.exports = { deleteService };
