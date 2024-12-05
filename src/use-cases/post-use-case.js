const axios = require("axios");

const postUseCase = async (postData) => {
  try {
    const response = await axios.post(`${process.env.URL_API}/posts`, postData);
    return ('Sucesso!', response.data);
  } catch (error) {
    throw new Error("Erro ao criar postagem");
  }
};

module.exports = { postUseCase };
