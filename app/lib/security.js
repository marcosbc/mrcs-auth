'use strict';
// Dependencies and variables
var bcrypt = require('bcrypt-nodejs');
// Initialize the security class
class SecurityFunctions {
  generateHash (plain, saltRounds) {
    return bcrypt.hashSync(plain, bcrypt.genSaltSync(saltRounds));
  }
  compareHash (plain, hash) {
    return bcrypt.compareSync(plain, hash);
  }
}
// Export the previously created class
module.exports = () => {
  return new SecurityFunctions();
};
