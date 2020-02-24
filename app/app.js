// Importa los módulos que usará la aplicación
var express = require("express");

// Crea una instancia del servidor
var app = express();
var socketApi = require("./socketApi.js");
var bodyParser = require("body-parser");
var path = require("path");
app.use("/static", express.static(__dirname + "/public/javascripts"));
app.use(bodyParser.json());
/* GET home page. */
app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

// Habilita el acceso al recurso ubicado en la raíz del servidor

app.get("/chat", function(req, res) {
  socketApi.showMessages().toArray(function(error, documents) {
    res.send(documents);
  });
});

app.post("/chat", function(req, res) {
  let message = {
    author: req.body.autor,
    text: req.body.content
  };
  socketApi.sendNotification(message);
  res.send(req.body);
});

module.exports = app;
