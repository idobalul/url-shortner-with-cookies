const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const { token } = req.cookies;
  console.log(token);
  if (token === undefined) {
    console.log('in 401');
    return res.status(401).send('Unauthorized try to sign in or sign up');
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).send('Try to sign in again');
    }
    console.log('user:', user);
    req.body.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
