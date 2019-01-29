var express = require("express");
var _ = require("lodash");
var mongoose = require("mongoose");
var router = express.Router();
var Item = require("../../models/item");

router.get("/", function(req, res, next) {
  Item.find()
    .select("description quantity price _id")
    .exec()
    .then(function(docs) {
      var response = {
        count: docs.length,
        items: docs.map(function(doc) {
          return {
            description: doc.description,
            quantity: doc.quantity,
            price: doc.price,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/items/" + doc._id
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
  Item.findById(id)
    .select("description quantity price _id")
    .exec()
    .then(function(doc) {
      if (doc) {
        res.status(200).json({
          item: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/items"
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

router.get("/search/:description", function(req, res, next) {
  var description = req.params.description;
  var products = _.filter(data.list, function(item) {
    return item.description.indexOf(description) >= 0;
  });
  res.status(200).json(products);
});

router.patch("/:id", function(req, res, next) {
  var id = req.params.id;
  var updateOps = {};
  for (var ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Item.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(function(result) {
      res.status(200).json({
        message: "Item updated!",
        request: {
          type: "GET",
          url: "http://localhost:3000/api/items/" + id
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
  Item.remove({ _id: id })
    .exec()
    .then(function(result) {
      res.status(200).json({
        message: "Item deleted!",
        request: {
          type: "POST",
          url: "http://localhost:3000/api/items",
          body: {
            description: "String",
            quantity: "Number",
            price: "Number"
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
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price
  });
  item
    .save()
    .then(function(result) {
      res.status(201).json({
        message: "Created item successfully",
        createdItem: {
          description: result.description,
          quantity: result.quantity,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/items/" + result._id
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
