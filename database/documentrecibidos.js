const mongoose = require("./connect");
var DOCUMENTRECIBIDOSSCHEMA = {
  identi:       String,
  nombre:       String,
  categoria:    String,
  link:         String,
  register:     Date,
  picture:      String,
  universidad:  String,
  facultad:     String,
  carrera:      String,
  numero:       Number,
  userId:       String,
  usernombre:   String,
  useroficina:  String,
  destino:      String,
  gestion:      String,

}

const DOCUMENTRECIBIDOS = mongoose.model("documentrecibidos", DOCUMENTRECIBIDOSSCHEMA);
module.exports = {model: DOCUMENTRECIBIDOS, schema: DOCUMENTRECIBIDOSSCHEMA};
