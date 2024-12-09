require("dotenv").config();

const express = require("express");

const deleteController = require("./controllers/delete-controller");
const getController = require("./controllers/get-controller");
const postController = require("./controllers/post-controller");
const putController = require("./controllers/put-controller");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("", getController);
app.use("", postController);
app.use("", putController);
app.use("", deleteController);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
