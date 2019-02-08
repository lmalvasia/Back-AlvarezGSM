const Provider = require("../models/provider");
const mongoose = require("mongoose");

module.exports = {
  index: async (req, res, next) => {
    const providers = await Provider.find({});
    res.status(200).json(providers);
  },
  newProvider: async (req, res, next) => {
    const newProvider = new Provider({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      street: req.body.street,
      cellphone: req.body.cellphone
    });
    const provider = await newProvider.save();
    res.status(201).json(provider);
  },
  getProvider: async (req, res, next) => {
    const providerId = req.params.id;
    const provider = await Provider.findById(providerId);
    res.status(200).json(provider);
  },
  replaceProvider: async (req, res, next) => {
    const providerId = req.params.id;
    const newProvider = req.body;
    const result = await Provider.findOneAndReplace(providerId, newProvider);
    res.status(201).json({
      message: "Provider replaced successfully!"
    });
  },
  updateProvider: async (req, res, next) => {
    const providerId = req.params.id;
    const newProvider = req.body;
    const result = await Provider.findOneAndUpdate(providerId, newProvider);
    res.status(201).json({
      message: "Provider updated successfully!"
    });
  },
  deleteProvider: async (req, res, next) => {}
};
