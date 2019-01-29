var express = require("express");
var _ = require("lodash");
var mongoose = require("mongoose");
var router = express.Router();
var Provider = require("../../models/provider");

router.get("/", function(req, res, next) {
  Provider.find()
    .select("name street cellphone _id")
    .exec()
    .then(function(docs) {
      var response = {
        count: docs.length,
        providers: docs.map(function(doc) {
          return {
            name: doc.name,
            street: doc.street,
            cellphone: doc.cellphone,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/providers/" + doc._id
            }
          };
        })
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No entries found"
        });
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  Provider.findById(id)
    .select("name street cellphone _id")
    .exec()
    .then(function(doc) {
      if (doc) {
        res.status(200).json({
          provider: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/providers"
          }
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID"
        });
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:id", function(req, res, next) {
  var id = req.params.id;
  var updateOps = {};
  for (var ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Provider.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(function(result) {
      res.status(200).json({
        message: "Provider updated!",
        request: {
          type: "GET",
          url: "http://localhost:3000/api/providers/" + id
        }
      });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:id", function(req, res, next) {
  var id = req.params.id;
  Provider.remove({ _id: id })
    .exec()
    .then(function(result) {
      res.status(200).json({
        message: "Provider deleted!",
        request: {
          type: "POST",
          url: "http://localhost:3000/api/providers",
          body: {
            name: "String",
            street: "String",
            cellphone: "Number"
          }
        }
      });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", function(req, res, next) {
  const provider = new Provider({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    street: req.body.street,
    cellphone: req.body.cellphone
  });
  provider
    .save()
    .then(function(result) {
      res.status(201).json({
        message: "Created provider successfully",
        createdProvider: {
          name: result.name,
          street: result.street,
          cellphone: result.cellphone,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/providers/" + result._id
          }
        }
      });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
