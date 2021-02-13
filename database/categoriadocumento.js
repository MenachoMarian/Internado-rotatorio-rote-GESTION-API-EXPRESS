const mongoose = require("./connect");
var CATEGORIASCHEMA = {
  categoria:      String,
  code:   String,
  register:    Date,
}

const CATEGORIA = mongoose.model("categoria", CATEGORIASCHEMA);
module.exports = {model: CATEGORIA, schema: CATEGORIASCHEMA};
