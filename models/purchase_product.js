const mongoose = require("mongoose");

const purchaseproductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: true
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "purchase",
    required: true
  }
});

module.exports = mongoose.model("purchaseproduct", purchaseproductSchema);
