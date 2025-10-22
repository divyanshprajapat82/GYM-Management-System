let jwt = require("jsonwebtoken");

let authMiddleware = (req, res, next) => {
  try {
    // console.log(req.headers);

    let token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    let decoded = jwt.verify(token, process.env.TOKENKEY);
    // console.log(decoded.id);

    req.userId = decoded.id;

    // console.log(req.userId);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authMiddleware };
