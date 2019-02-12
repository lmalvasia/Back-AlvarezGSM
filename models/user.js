const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: 0 }
});

module.exports = mongoose.model("user", userSchema);
