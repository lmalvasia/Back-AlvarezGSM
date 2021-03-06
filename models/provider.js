const mongoose = require("mongoose");

const providerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  cellphone: { type: Number, required: true },
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "purchase" }]
});

module.exports = mongoose.model("provider", providerSchema);
