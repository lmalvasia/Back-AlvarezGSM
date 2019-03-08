const Item = require("../models/item");
const mongoose = require("mongoose");

module.exports = {
  index: async (req, res, next) => {
    const items = await Item.find({});
    res.status(200).json(items);
  },
  newItem: async (req, res, next) => {
    const newItem = new Item({
      _id: mongoose.Types.ObjectId(),
      description: req.value.body.description,
      quantity: req.value.body.quantity,
      price: req.value.body.price
    });
    const item = await newItem.save();
    res.status(201).json({
      item: item,
      message: "Item added successfully"
    });
  },
  getItem: async (req, res, next) => {
    const itemId = req.value.params.id;
    const item = await Item.findById(itemId);
    res.status(200).json(item);
  },
  replaceItem: async (req, res, next) => {
    const itemId = req.value.params.id;
    const newItem = req.value.body;
    const result = await Item.findByIdAndUpdate(itemId, newItem);
    res.status(201).json({
      message: "Item replaced successfully!"
    });
  },
  updateItem: async (req, res, next) => {
    const itemId = req.value.params.id;
    const newItem = req.value.body;
    const result = await Item.findByIdAndUpdate(itemId, newItem);
    res.status(201).json({
      message: "Item updated successfully!"
    });
  },
  deleteItem: async (req, res, next) => {
    const itemId = req.value.params.id;
    const result = await Item.findByIdAndDelete(itemId);
    res.status(201).json({
      message: "Item deleted successfully!"
    });
  }
};
