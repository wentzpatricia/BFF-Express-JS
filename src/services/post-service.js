const useCase = require("../use-cases/post-use-case");

const postService = async (postData) => {
  return useCase.postUseCase(postData);
};

module.exports = { postService };
