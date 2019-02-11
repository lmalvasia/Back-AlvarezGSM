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
      firstName: req.value.body.firstName,
      lastName: req.value.body.lastName,
      email: req.value.body.email,
      street: req.value.body.street,
      cellphone: req.value.body.cellphone
    });
    const customer = await newCustomer.save();
    res.status(201).json(customer);
  },
  getCustomer: async (req, res, next) => {
    const customerId = req.value.params.id;
    const customer = await Customer.findById(customerId);
    res.status(200).json(customer);
  },
  replaceCustomer: async (req, res, next) => {
    const customerId = req.value.params.id;
    const newCustomer = req.value.body;
    const result = await Customer.findOneAndReplace(customerId, newCustomer);
    res.status(201).json({
      message: "Customer replaced successfully!"
    });
  },
  updateCustomer: async (req, res, next) => {
    const customerId = req.value.params.id;
    const newCustomer = req.value.body;
    const result = await Customer.findOneAndUpdate(customerId, newCustomer);
    res.status(201).json({
      message: "Customer updated successfully!"
    });
  },
  deleteCustomer: async (req, res, next) => {
    const customerId = req.value.params.id;
    const result = await Customer.findByIdAndDelete(customerId);
    res.status(201).json({
      message: "Customer deleted successfully!"
    });
  }
};
