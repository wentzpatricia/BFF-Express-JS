const express = require("express");
const service = require("../services/post-service");
const postController = express.Router();

postController.post("/create-posts", async (req, res) => {
  try {
    const postData = req.body;
    const data = await service.postService(postData);
    res.status(201).json({ message: "Post criado!", data });
  } catch (error) {
    error.status
      ? res.status(error.status).json({ message: error.message })
      : res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = postController;
