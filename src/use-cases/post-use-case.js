const axios = require("axios");

const postUseCase = async () => {
  try {
    const response = await axios.post(`${process.env.URL_API}/posts`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar postagem");
  }
};

module.exports = { postUseCase };
