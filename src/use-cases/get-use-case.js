const axios = require("axios");

getUseCase = async () => {
  try {
    const response = await axios.get(`${process.env.URL_API}/posts`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar dados da API");
  }
};

module.exports = { getUseCase };
