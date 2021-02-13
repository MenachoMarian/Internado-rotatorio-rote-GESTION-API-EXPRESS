const mongoose = require("./connect");
var TEXTOSCHEMA = {
//  identi:   String,
  nombre:      String,
//  categoria:   String,
  //link:         String,
  register:    Date,
  text:      String,
}

const TEXTO = mongoose.model("texto", TEXTOSCHEMA);
module.exports = {model: TEXTO, schema: TEXTOSCHEMA};
