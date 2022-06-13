const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('config');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const tokenSecret = config.get('tokenSecret');

  if (authHeader == null) return res.sendStatus(401);

  jwt.verify(authHeader, tokenSecret, (err, user) => {
    if (err) {
        return res.sendStatus(403);
        console.log(err);
    }
    req.userToken = user;
    next();
  });
}



module.exports = {
    authenticateToken
}