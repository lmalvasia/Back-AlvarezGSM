const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },
  newUser: async (req, res, next) => {
    if ((await User.find({ email: req.body.email })).length > 0) {
      res.status(409).json({
        message: "Mail already exist!"
      });
    } else {
      const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        admin: req.body.admin
      });
      const user = await newUser.save();
      res.status(201).json(user);
    }
  },
  deleteUser: async (req, res, next) => {
    const userId = req.params.id;
    console.log(userId);
    const result = await User.findByIdAndDelete(userId);
    res.status(201).json({
      message: "User deleted successfully!"
    });
  },
  login: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({
        message: "Auth failed"
      });
    } else {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = await jwt.sign(
          {
            email: user.email,
            userId: user._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
        );
        res.status(200).json({
          message: "Auth successful",
          token: token,
          user: user.email
        });
      } else {
        res.status(401).json({
          message: "Auth failed"
        });
      }
    }
  }
};
