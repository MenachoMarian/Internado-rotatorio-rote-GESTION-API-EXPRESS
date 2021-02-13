const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

const documento = require('../../database/document');
const DOCUMENT = documento.model;
const DOCUMENTSCHEMA = documento.schema;

const texto = require('../../database/texto');
const TEXTO = texto.model;
const TEXTOSCHEMA = TEXTO.schema;

const categoria = require('../../database/categoriadocumento');
const CATEGORIA = categoria.model;
const CATEGORIASCHEMA = CATEGORIA.schema;

const oficina = require('../../database/oficinas');
const OFICINA = oficina.model;
const OFICINASCHEMA = OFICINA.schema;

const documentother = require('../../database/documentothers');
const DOCUMENTOTHER = documentother.model;
const DOCUMENTOTHERSCHEMA = DOCUMENTOTHER.schema;

const gestion = require('../../database/gestion');
const GESTION = gestion.model;
const GESTIONSCHEMA = GESTION.schema;




const baseUrl = "http://localhost:8080/files/";

const multer = require('multer');
//const fmr = require('../middleware/upload');
const uploadFile = require("../middleware/upload");
const fs = require("fs");

const externouploadFile = require("../middleware/externoupload");
const otrofs = require("fs");

const { v4: uuidv4 } = require('uuid');;


let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);



  router.post("/documento", async(req, res, next)=>{
    var params = req.body;
    //params["id"]=uuidv4();
    params["register"] = new Date();

    //var num = DOCUMENT.countDocuments()+1;
    //num= num-1
    //params["numero"] = num;

    var documento = new DOCUMENT(params);
    var result = await documento.save();
    res.status(200).json(result);

    });

router.post("/documento/uploadImg", async(req,res)=>{
    await uploadFile(req, res);
      var id =req.query.identi;
      if(id == null){
        res.status(300).json({
          "msn":"se debe especificar id"+req.file.originalname
        });
        return;
      }
      DOCUMENT.find({identi:id}).exec((err,docs)=>{
        if(err){
          res.status(300).json({
            "msn":"se debe especificar id..."
          });
          return;
        }
              let imagename =req.file.originalname;
              let linkimage = baseUrl+req.file.originalname;
              DOCUMENT.updateOne({identi: id},
                {$set:{picture:imagename, link:linkimage}},
                (err, docs) => {
                if (err) {
                  res.status(200).json({
                    "msn" : err
                });
                  return;
                }
                res.status(200).json(docs);
              });
      });
    });

    router.get("/documento",async(req,res, next) => {
      var params = req.query;
      var limit = 100;
      if(params.limit != null){
        limit = parseInt(params.limit);
      }
      var order = -1;
      if(params.sort != null){
        if(params.sort == "desc") {
          order = -1;
        }else if (params.sort == "asc") {
          order = 1;
        }
      }
      var filter = {};
      if(params.id != null){
        filter= {_id: params.id};
      }
      var fil = {};
      if(params.nombre != null){
        fil= {nombre: params.nombre}; }

      var skip = 0;
      if (params.skip != null) {
        skip = parseInt(params.skip);
      }

      var last = {};
      if (params.id != null) {
        last= sort({_id:-1}.limit(1));
      }
      var list = await DOCUMENT.find(filter).limit(limit).sort({_id: order}).skip(skip).find(fil).find(last);
      res.status(200).json(list);
    });

    router.get("/lastdocumento",async(req,res, next) => {
      var params = req.query;

    //  db.SOME_COLLECTION.find().sort({"_id" : -1}).limit(1)
      var list = await DOCUMENT.find({ }, { id: 1 }).sort({"_id": -1}).limit(1);

       //list=((list[0].id).toString());

       list = ((list[0].id).toString());

       //var sin = list.replace(/["']/g,"")

       //var cursor = list.replace(/['"]+/g, '')
        res.status(200).json(list.replace(/["']/g,""));
        //res.status(200).json(list);
      //res.status(200).json(jsonResponse);
    });

  router.post("/texto", async(req, res, next)=>{
      var params = req.body;
      //params["id"]=uuidv4();
      params["register"] = new Date();

      var texto = new TEXTO(params);
      var result = await texto.save();
      res.status(200).json(result);

      });

  router.post("/categoria", async(req, res, next)=>{
        var params = req.body;
        //params["id"]=uuidv4();
        params["register"] = new Date();

        var categoria = new CATEGORIA(params);
        var result = await categoria.save();
        res.status(200).json(result);

        });


  router.get("/categoria",async(req,res, next) => {
          var params = req.query;
          var limit = 100;
          if(params.limit != null){
            limit = parseInt(params.limit);
          }
          var order = -1;
          if(params.sort != null){
            if(params.sort == "desc") {
              order = -1;
            }else if (params.sort == "asc") {
              order = 1;
            }
          }
          var filter = {};
          if(params.id != null){
            filter= {_id: params.id};
          }
          var fil = {};
          if(params.nombre != null){
            fil= {nombre: params.nombre}; }
          var skip = 0;
          if (params.skip != null) {
            skip = parseInt(params.skip);
          }
          var last = {};
          if (params.id != null) {
            last= sort({_id:-1}.limit(1));
          }
          var list = await CATEGORIA.find(filter).limit(limit).sort({_id: order}).skip(skip).find(fil).find(last);
          res.status(200).json(list);
        });


router.post("/oficina", async(req, res, next)=>{
              var params = req.body;
              //params["id"]=uuidv4();
              params["register"] = new Date();

              var oficina = new OFICINA(params);
              var result = await oficina.save();
              res.status(200).json(result);
              });

router.get("/oficina",async(req,res, next) => {
                      var params = req.query;
                      var limit = 100;
                      if(params.limit != null){
                        limit = parseInt(params.limit);
                      }
                      var order = -1;
                      if(params.sort != null){
                        if(params.sort == "desc") {
                          order = -1;
                        }else if (params.sort == "asc") {
                          order = 1;
                        }
                      }
                      var filter = {};
                      if(params.id != null){
                        filter= {_id: params.id};
                      }
                      var fil = {};
                      if(params.nombre != null){
                        fil= {nombre: params.nombre}; }
                      var skip = 0;
                      if (params.skip != null) {
                        skip = parseInt(params.skip);
                      }
                      var last = {};
                      if (params.id != null) {
                        last= sort({_id:-1}.limit(1));
                      }
                      var list = await OFICINA.find(filter).limit(limit).sort({_id: order}).skip(skip).find(fil).find(last);
                      res.status(200).json(list);
                    });

router.post("/documentother", async(req, res, next)=>{
                      var params = req.body;
                      //params["id"]=uuidv4();
                      params["register"] = new Date();
                      var documentother = new DOCUMENTOTHER(params);
                      var result = await documentother.save();
                      res.status(200).json(result);
                      });

router.post("/documentother/uploadImg", async(req,res)=>{
                       await uploadFile(req, res);
                         var id =req.query.identi;
                         if(id == null){
                           res.status(300).json({
                             "msn":"se debe especificar id"+req.file.originalname
                           });
                           return;
                         }
                         DOCUMENTOTHER.find({identi:id}).exec((err,docs)=>{
                           if(err){
                             res.status(300).json({
                               "msn":"se debe especificar id..."
                             });
                             return;
                           }
                                 let imagename =req.file.originalname;
                                 let linkimage = baseUrl+req.file.originalname;
                                 DOCUMENTOTHER.updateOne({identi: id},
                                   {$set:{picture:imagename, link:linkimage}},
                                   (err, docs) => {
                                   if (err) {
                                     res.status(200).json({
                                       "msn" : err
                                   });
                                     return;
                                   }
                                   res.status(200).json(docs);
                                 });
                         });
                       });

router.get("/documentother",async(req,res, next) => {
                         var params = req.query;
                         var limit = 100;
                         if(params.limit != null){
                           limit = parseInt(params.limit);
                         }
                         var order = -1;
                         if(params.sort != null){
                           if(params.sort == "desc") {
                             order = -1;
                           }else if (params.sort == "asc") {
                             order = 1;
                           }
                         }
                         var filter = {};
                         if(params._id != null){
                           filter= {_id: params._id};
                         }

                         var filterIDUSER = {};
                         if(params.userId != null){
                           filter= {userId: params.userId};
                         }
                         var fil = {};
                         if(params.useroficina != null){
                           fil= {useroficina: params.useroficina}; }

                         var skip = 0;
                         if (params.skip != null) {
                           skip = parseInt(params.skip);
                         }

                         var last = {};
                         if (params.id != null) {
                           last= sort({_id:-1}.limit(1));
                         }
                         var list = await DOCUMENTOTHER.find(filter).limit(limit).sort({_id: order}).skip(skip).find(fil).find(last).find(filterIDUSER);
                         res.status(200).json(list);
                       });

router.post("/gestion", async(req, res, next)=>{
          var params = req.body;
          //params["id"]=uuidv4();
          params["register"] = new Date();
          var gestion = new GESTION(params);
          var result = await gestion.save();
          res.status(200).json(result);
          });

router.get("/gestion",async(req,res, next) => {
        var params = req.query;
        var limit = 100;
        if(params.limit != null){
           limit = parseInt(params.limit);
         }
        var order = -1;
        if(params.sort != null){
        if(params.sort == "desc") {
           order = -1;
        }else if (params.sort == "asc") {
           order = 1;
         }
        }
        var filter = {};
        if(params.id != null){
           filter= {_id: params.id};
        }
        var fil = {};
        if(params.nombre != null){
        fil= {nombre: params.nombre}; }

         var skip = 0;
         if (params.skip != null) {
           skip = parseInt(params.skip);
         }

         var last = {};
         if (params.id != null) {
             last= sort({_id:-1}.limit(1));
         }
         var list = await GESTION.find(filter).limit(limit).sort({_id: order}).skip(skip).find(fil).find(last);
           res.status(200).json(list);
         });



  app.use(router);
};

module.exports = routes;
