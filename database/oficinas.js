const mongoose = require("./connect");
var OFICINASCHEMA = {
  oficinanombre:            String,
  oficinacode:               String,
  oficinadescription:        String,
  register:                  Date,
}

const OFICINA = mongoose.model("oficina", OFICINASCHEMA);
module.exports = {model: OFICINA, schema: OFICINASCHEMA};
