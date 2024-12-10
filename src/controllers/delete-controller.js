const express = require("express");
const service = require("../services/delete-service");
const deleteController = express.Router();

deleteController.delete("/delete-post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteService(id);
    res.status(200).json({ message: "Post excluído!" });
  } catch (error) {
    error.status
      ? res.status(error.status).json({ message: error.message })
      : res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = deleteController;
