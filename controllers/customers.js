const Customer = require("../models/customer");
const mongoose = require("mongoose");

module.exports = {
  index: async (req, res, next) => {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  },
  newCustomer: async (req, res, next) => {
    const newCustomer = new Customer({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      street: req.body.street,
      cellphone: req.body.cellphone
    });
    const customer = await newCustomer.save();
    res.status(201).json(customer);
  },
  getCustomer: async (req, res, next) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    res.status(200).json(customer);
  },
  replaceCustomer: async (req, res, next) => {
    const customerId = req.params.id;
    const newCustomer = req.body;
    const result = await Customer.findOneAndReplace(customerId, newCustomer);
    res.status(201).json({
      message: "Customer replaced successfully!"
    });
  },
  updateCustomer: async (req, res, next) => {
    const customerId = req.params.id;
    const newCustomer = req.body;
    const result = await Customer.findOneAndUpdate(customerId, newCustomer);
    res.status(201).json({
      message: "Customer updated successfully!"
    });
  },
  deleteCustomer: async (req, res, next) => {
    const customerId = req.params.id;
    const result = await Customer.findByIdAndDelete(customerId);
    res.status(201).json({
      message: "Customer deleted successfully!"
    });
  }
};
