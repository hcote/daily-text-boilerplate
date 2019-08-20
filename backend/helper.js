const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// object with methods to validate user
const helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * Regex is saying, test if the email input...
   *    starts with: string (/\S) i.e. john
   *    then: @ (+@) i.e. @ 
   *    then: string (\S) i.e. gmail
   *    then: . (\.) i.e. .
   *    then: string i.e. com
   *    end: (/)
   * and if so, it is valid
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
   * returns json with {userId: id, token: j4Idm984s...}
   */
  generateToken(id) {
    const token = jwt.sign({
      id
    },
      'secretkey', { expiresIn: '1d' }
    );
    return token;
  },

  // for authorization (not authentication)
  verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
  }
};

module.exports = helper;