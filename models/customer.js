const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  cellphone: { type: Number, required: true }
});

module.exports = mongoose.model("customer", customerSchema);
