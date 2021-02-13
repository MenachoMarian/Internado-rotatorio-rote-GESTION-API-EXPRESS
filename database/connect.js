const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:3001/meteor");
module.exports = mongoose;
