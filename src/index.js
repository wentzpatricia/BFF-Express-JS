require("dotenv").config();

const express = require("express");
const getController = require("./controllers/get-controller");

const app = express();
const port = process.env.PORT || 3000;

app.use("", getController);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
