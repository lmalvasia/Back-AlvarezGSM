const mongoose = require("mongoose");

const providerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  street: { type: String, required: true },
  cellphone: { type: Number, required: true }
});

module.exports = mongoose.model("provider", providerSchema);
