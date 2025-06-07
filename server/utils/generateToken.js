const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
  { 
    _id: user._id, 
    isAdmin: user.isAdmin,  // ✅ so backend can read it too from token
    firstName: user.firstName,
    lastName: user.lastName
  },
  process.env.JWT_SECRET || "your_secret_key", 
  { expiresIn: "3d" }
);
}
module.exports = generateToken;
