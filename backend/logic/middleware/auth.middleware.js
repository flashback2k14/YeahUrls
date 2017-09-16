module.exports = (tokenSecret) => {

  checkAuthState = async (req, res, next) => {
    // get token from request
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    // check if token is available
    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }

    try {
      const decoded = await jwt.verify(token, tokenSecret);
      req.decoded = decoded;
      next();
    } catch (error) {
      // setup error message
      let msg = "Failed to authenticate token.";
      // append error message
      if (error.name === "TokenExpiredError") {
        msg = `${msg} Token expired at ${error.expiredAt}`;
      }
      // append error message
      if (error.name === "JsonWebTokenError") {
        msg = `${msg} Error message: ${error.message}`;
      }
      return res.status(400).json({ message: msg });
    }
  }

  return {
    checkAuthState
  }
}
