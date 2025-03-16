const ruta = require('express').Router();
const controlador = require("./controlador.js");
const auth = require("../../middleware/auth.js");

ruta.get('/', controlador.all);
ruta.post("/", auth, controlador.create);
ruta.delete("/:id",auth, controlador.remove);
ruta.put("/:id",auth, controlador.update);

module.exports = ruta;
