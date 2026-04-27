const jwt = require("jsonwebtoken");

// Verify Token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Role Check
exports.isSupplier = (req, res, next) => {
  if (req.user.role !== "supplier") {
    return res.status(403).json({ message: "Access denied: Supplier only" });
  }
  next();
};

exports.isVendor = (req, res, next) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ message: "Access denied: Vendor only" });
  }
  next();
};