const express = require("express");
const service = require("../services/get-service");
const getController = express.Router();

getController.get("/list-posts", async (req, res) => {
  try {
    const data = await service.getService();
    res.json(data);
  } catch (error) {
    res.status(500).send("Erro ao buscar dados");
  }
});

module.exports = getController;
