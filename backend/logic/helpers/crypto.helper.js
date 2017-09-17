const cryptoJs = require("crypto-js");

module.exports = (secret) => {

  function encrypt (text) {
    return cryptoJs.AES.encrypt(text, secret);
  }

  function decrypt (text) {
    return cryptoJs.AES.decrypt(text.toString(), secret).toString(cryptoJs.enc.Utf8);
  }

  return {
    encrypt,
    decrypt
  }
}
