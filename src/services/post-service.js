const useCase = require("../use-cases/post-use-case");

const postService = async () => {
  return useCase.postUseCase();
};

module.exports = { postService };
