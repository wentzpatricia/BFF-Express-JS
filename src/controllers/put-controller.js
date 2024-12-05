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
    res.status(422).send("Erro ao editar post");
  }
});

module.exports = putController;
