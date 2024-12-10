const useCase = require("../use-cases/delete-use-case");

const deleteService = async (id) => {
  try {
    if (!id) {
      throw { status: 422, message: "Id é obrigatório" };
    }
    return await useCase.deleteUseCase(id);
  } catch (error) {
    if (!error.status) {
      console.error("Erro desconhecido: ", error);
    }
    throw error;
  }
};

module.exports = { deleteService };
