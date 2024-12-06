const express = require("express");
const service = require("../services/delete-service");
const deleteController = express.Router();

deleteController.delete("/delete-post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteService(id);
    res.status(200).json({ message: "Post excluído!" });
  } catch (error) {
    res.status(422).send("Erro ao excluir post");
  }
});

module.exports = deleteController;
