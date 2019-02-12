const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_KEY, null);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed"
    });
  }
};
