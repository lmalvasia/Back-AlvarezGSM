const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  purchaseproducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchaseproduct"
    }
  ]
});

module.exports = mongoose.model("item", itemSchema);
