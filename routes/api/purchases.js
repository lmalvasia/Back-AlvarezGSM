var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Purchase = require("../../models/purchase");
var PurchaseProduct = require("../../models/purchase_product");
var Provider = require("../../models/provider");
var Product = require("../../models/item");

router.get("/", function(req, res, next) {
  Purchase.find()
    .select("purchase_number provider purchaseproducts _id ")
    .populate("provider purchaseproducts")
    .exec()
    .then(function(docs) {
      res.status(200).json({
        count: docs.length,
        purchases: docs.map(function(doc) {
          return {
            _id: doc._id,
            purchase_number: doc.purchase_number,
            provider: doc.provider,
            purchaseproducts: doc.purchaseproducts,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/purchases/" + doc._id
            }
          };
        })
      });
    })
    .catch(function(err) {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:id", function(req, res, next) {
  Purchase.findById(req.params.id)
    .populate("provider products")
    .exec()
    .then(function(purchase) {
      if (!purchase) {
        return res.status(404).json({
          message: "Purchase not found"
        });
      }
      res.status(200).json({
        purchase: purchase,
        request: {
          type: "GET",
          url: "http://localhost:3000/api/purchases"
        }
      });
    })
    .catch(function(err) {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:id/products", function(req, res, next) {
  var id = req.params.id;
  Purchase.findById(id)
    .exec()
    .then(function(purchase) {
      if (!purchase) {
        return res.status(404).json({
          message: "Purchase not found"
        });
      }
      res.status(200).json({
        purchase: purchase
      });
    })
    .catch();
});

router.post("/:id/products", async function(req, res, next) {
  var purchase = await Purchase.findById(req.params.id);
  var product = await Product.findById(req.body.productId);
  console.log(purchase);
  console.log(product);
});
router.patch("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Update purchase"
  });
});

router.delete("/:id", function(req, res, next) {
  Purchase.remove({ id: req.params.id })
    .exec()
    .then(function(result) {
      res.status(200).json({
        message: "Purchase deleted successfully!",
        request: {
          type: "GET",
          url: "http://localhost:3000/api/purchases"
        }
      });
    })
    .catch(function(err) {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", function(req, res, next) {
  Provider.findById(req.body.providerId, function(err, provider) {
    if (provider) {
      const purchase = new Purchase({
        _id: mongoose.Types.ObjectId(),
        purchase_number: req.body.purchaseNumber,
        provider: req.body.providerId,
        products: req.body.products
      });
      purchase
        .save()
        .then(function(result) {
          res.status(201).json({
            message: "Purchase created successfully",
            createdPurchase: {
              _id: result._id,
              purchase_number: result.purchase_number,
              provider: result.provider,
              purchaseproducts: result.purchaseproduct,
              quantity: result.quantity
            },
            request: {
              type: "GET",
              url: "http://localhost:3000/api/purchases/" + result._id
            }
          });
        })
        .catch(function(err) {
          res.status(500).json({
            error: err
          });
        });
    } else {
      res.status(404).json({
        message: "Not found provider"
      });
    }
  });
});
module.exports = router;
