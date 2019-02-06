const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  purchase_number: { type: Number, required: true, unique: true },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "provider",
    required: true
  },
  purchaseproducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchaseproduct"
    }
  ]
});

module.exports = mongoose.model("purchase", purchaseSchema);
