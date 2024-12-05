const axios = require("axios");

const putUseCase = async (postData, id) => {
  try {
    const response = await axios.put(
      `${process.env.URL_API}/posts/${id}`,
      postData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao editar postagem");
  }
};

module.exports = { putUseCase };
