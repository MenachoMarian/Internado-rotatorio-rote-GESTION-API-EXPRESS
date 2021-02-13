const mongoose = require("./connect");
var GESTIONSCHEMA = {
  nombre:      String,
  descripcion: String,
  register:    Date,
}

const GESTION = mongoose.model("gestion", GESTIONSCHEMA);
module.exports = {model: GESTION, schema: GESTIONSCHEMA};
