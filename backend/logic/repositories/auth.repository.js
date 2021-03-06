const jwt = require("jsonwebtoken");

module.exports = (UserModel, Config, CryptoHelper) => {

  function _transformUser (user) {
    return {
      "id": user._id,
      "name": user.name,
      "isAdmin": user.isAdmin,
      "created": user.createdAt,
      "updated": user.updatedAt 
    }
  }

  async function signIn (username, userpassword) {
    // search for username
    const foundUser = await UserModel.findOne({ name: username }).lean();
    // validate founduser
    if (!foundUser) throw new Error("Authentication failed. User not found.")
    if (userpassword !== CryptoHelper.decrypt(foundUser.passwordHash)) throw new Error("Authentication failed. Wrong password.");
    // create a token
    const token = await jwt.sign(foundUser, Config.tokenSecret, {
      expiresIn: Config.tokenExpires,
      issuer: Config.tokenIssuer
    });
    // delete password before return the user
    delete foundUser.passwordHash;
    // return token and user
    return {
      token: token,
      user: this._transformUser(foundUser)
    }
  }

  async function signUp (username, userpassword, isAdmin) {
    // try to find the user
    const foundUser = await UserModel.findOne({name: username}).lean();
    // check if user is available
    if (foundUser) throw new Error("Username is already registered. Please use another Username.");
    // create new User object
    const newUser = new UserModel({
      name: username,
      passwordHash: CryptoHelper.encrypt(userpassword),
      isAdmin: isAdmin
    });
    // save new User object
    const createdUser = await newUser.save();
    // delete password before return the user
    delete createdUser.passwordHash;
    // return user
    return {
      user: this._transformUser(createdUser)
    }
  }

  return {
    _transformUser,
    signIn,
    signUp
  }
}
