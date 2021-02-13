var express = require('express');
var router = express.Router();

const documento = require('../database/document');
const DOCUMENT = documento.model;
const DOCUMENTSCHEMA = documento.schema;

const baseUrl = "http://localhost:8080/files/";

const multer = require('multer');
var fmr = require('../middleware/upload');

router.post("/documento", async(req, res, next)=>{
  var params = req.body;
  params["register"] = new Date();

  var documento = new DOCUMENT(params);
  var result = await documento.save();
  res.status(200).json(result);

  });

module.exports = router;
