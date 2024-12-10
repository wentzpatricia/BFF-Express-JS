const useCase = require("../use-cases/put-use-case");

const putService = async (postData, id) => {
  try {
    const { title, body, userId } = postData;

    if (!title || !body || !userId) {
      throw { status: 422, message: "Title, body e userId são obrigatórios" };
    }

    if (!id) {
      throw { status: 422, message: "Id é obrigatório" };
    }

    return await useCase.putUseCase(postData, id);
  } catch (error) {
    if (!error.status) {
      console.error("Erro desconhecido: ", error);
    }
    throw error;
  }
};

module.exports = { putService };
