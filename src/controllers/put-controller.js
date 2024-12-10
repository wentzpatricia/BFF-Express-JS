const express = require("express");
const service = require("../services/put-service");
const putController = express.Router();

putController.put("/edit-post/:id", async (req, res) => {
  try {
    const postData = req.body;
    const { id } = req.params;
    const data = await service.putService(postData, id);
    res.status(200).json({ message: "Post editado!", data });
  } catch (error) {
    error.status
      ? res.status(error.status).json({ message: error.message })
      : res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = putController;
