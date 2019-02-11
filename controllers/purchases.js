const Purchase = require("../models/purchase");
const Purchase_Product = require("../models/purchase_product");
const Item = require("../models/item");
const Provider = require("../models/provider");
const mongoose = require("mongoose");

module.exports = {
  index: async (req, res, next) => {
    const purchases = await Purchase.find({})
      .select("_idpurchase_number provider")
      .populate("provider", "name");
    res.status(200).json(purchases);
  },
  newPurchase: async (req, res, next) => {
    const provider = await Provider.findById(req.value.body.provider);
    const newPurchase = new Purchase({
      _id: mongoose.Types.ObjectId(),
      purchase_number: req.value.body.purchase_number,
      provider: provider
    });
    const purchase = await newPurchase.save();
    provider.purchases.push(provider);
    await provider.save();
    res.status(201).json(purchase);
  },
  getPurchase: async (req, res, next) => {
    const purchaseId = req.value.params.id;
    const purchase = await Purchase.findById(purchaseId)
      .select("_id purchase_number provider")
      .populate("provider", "name");
    res.status(200).json(purchase);
  },
  replacePurchase: async (req, res, next) => {
    const purchaseId = req.value.params.id;
    const newPurchase = req.value.body;
    const result = await Purchase.findOneAndReplace(purchaseId, newPurchase);
    res.status(201).json({
      message: "Purchase replaced successfully!"
    });
  },
  updatePurchase: async (req, res, next) => {
    const purchaseId = req.value.params.id;
    const newPurchase = req.value.body;
    const result = await Purchase.findOneAndUpdate(purchaseId, newPurchase);
    res.status(201).json({
      message: "Purchase updated successfully!"
    });
  },
  deletePurchase: async (req, res, next) => {
    const purchaseId = req.value.params.id;
    const purchase = await Purchase.findById(purchaseId);
    const provider = await Provider.findById(purchase.provider).populate(
      "purchases"
    );
    const purchase_products = await Purchase_Product.find({
      purchase: purchase
    });
    for (i = 0; i < purchase_products.length; i++) {
      const item = await Item.findById(purchase_products[i].product._id);
      if (item) {
        item.purchaseproducts.pull(purchase_products[i]);
        await item.save();
        await Purchase_Product.deleteOne(purchase_products[i]);
      }
    }
    provider.purchases.pull(purchase);
    await Provider.findByIdAndUpdate(provider._id, provider);
    await Purchase.findByIdAndDelete(purchase._id);
  },
  getPurchase_Products: async (req, res, next) => {
    const purchaseId = req.value.params.id;
    const purchase = await Purchase.findById(purchaseId);
    res.status(200).json(purchase.purchaseproducts);
  },
  newPurchase_Product: async (req, res, next) => {
    const item = await Item.findById(req.value.body.product);
    const purchase = await Purchase.findById(req.value.params.id);
    const purchase_product = new Purchase_Product({
      _id: mongoose.Types.ObjectId(),
      product: item,
      quantity: req.value.body.quantity,
      price: req.value.body.price,
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
      item.purchaseproducts.push(purchase_product);
      await item.save();
    }, 2000);
    res.status(201).json(purchase_product);
  }
};
