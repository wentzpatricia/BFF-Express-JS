const express = require("express");
const service = require("../services/post-service");
const postController = express.Router();

postController.post("/create-posts", async (req, res) => {
  try {
    const data = await service.postService();
    res.json(data);
  } catch (error) {
    res.status(422).send("Erro ao criar post");
  }
});

module.exports = postController;
