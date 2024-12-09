const useCase = require("../use-cases/post-use-case");

const postService = async (postData) => {
  try {
    const { title, body, userId } = postData;

    if (!title || !body || !userId) {
      throw { status: 422, message: "Title, body e userId são obrigatórios" };
    }

    return await useCase.postUseCase(postData);
  } catch (error) {
    if (!error.status) {
      console.error("Erro desconhecido: ", error);
    }
    throw error;
  }
};

module.exports = { postService };
