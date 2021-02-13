const mongoose = require("./connect");
var DOCUMENTOTHERSCHEMA = {
  identi:       String,
  nombre:       String,
  categoria:    String,
  link:         String,
  register:     Date,
  picture:      String,
  universidad:  String,
  facultad:     String,
  carrera:      String,
  //numero:       Number,
  userId:       String,
  usernombre:   String,
  useroficina:  String,
  destino:      String,
  gestion:      String,

}

const DOCUMENTOTHER = mongoose.model("documentother", DOCUMENTOTHERSCHEMA);
module.exports = {model: DOCUMENTOTHER, schema: DOCUMENTOTHERSCHEMA};
