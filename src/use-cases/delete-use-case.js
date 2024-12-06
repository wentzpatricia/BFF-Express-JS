const axios = require("axios");

const deleteUseCase = async (id) => {
  try {
    const response = await axios.delete(`${process.env.URL_API}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao excluir postagem");
  }
};

module.exports = { deleteUseCase };
