const Purchase = require("../models/purchase");
const Purchase_Product = require("../models/purchase_product");
const Item = require("../models/item");
const Provider = require("../models/provider");
const mongoose = require("mongoose");

module.exports = {
  index: async (req, res, next) => {
    const purchases = await Purchase.find({});
    res.status(200).json(purchases);
  },
  newPurchase: async (req, res, next) => {
    const provider = await Provider.findById(req.body.provider);
    const newPurchase = new Purchase({
      _id: mongoose.Types.ObjectId(),
      purchase_number: req.body.purchase_number,
      provider: provider
    });
    const purchase = await newPurchase.save();
    res.status(201).json(purchase);
  },
  getPurchase: async (req, res, next) => {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId);
    res.status(200).json(purchase);
  },
  replacePurchase: async (req, res, next) => {
    const purchaseId = req.params.id;
    const newPurchase = req.body;
    const result = await Purchase.findOneAndReplace(purchaseId, newPurchase);
    res.status(201).json({
      message: "Purchase replaced successfully!"
    });
  },
  updatePurchase: async (req, res, next) => {
    const purchaseId = req.params.id;
    const newPurchase = req.body;
    const result = await Purchase.findOneAndUpdate(purchaseId, newPurchase);
    res.status(201).json({
      message: "Purchase updated successfully!"
    });
  },
  deletePurchase: async (req, res, next) => {},
  getPurchase_Products: async (req, res, next) => {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId);
    res.status(200).json(purchase.purchaseproducts);
  },
  newPurchase_Product: async (req, res, next) => {
    const item = await Item.findById(req.body.product);
    const purchase = await Purchase.findById(req.params.id);
    const purchase_product = new Purchase_Product({
      _id: mongoose.Types.ObjectId(),
      product: item,
      quantity: req.body.quantity,
      price: req.body.price,
      purchase: purchase
    });
    setTimeout(() => {
      purchase_product.save();
    }, 2000);
    setTimeout(async () => {
      purchase.purchaseproducts.push(purchase_product);
      await purchase.save();
    }, 2000);
    setTimeout(async () => {
      item.purchaseproducts.push(purchase);
      await item.save();
    }, 2000);
    res.status(201).json(purchase_product);
  }
};
