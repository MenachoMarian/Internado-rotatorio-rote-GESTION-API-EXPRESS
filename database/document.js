const mongoose = require("./connect");
var DOCUMENTSCHEMA = {
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

const DOCUMENT = mongoose.model("document", DOCUMENTSCHEMA);
module.exports = {model: DOCUMENT, schema: DOCUMENTSCHEMA};
