const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparHashedPassword(password, hashedPassword) {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}

module.exports = {
  hashPassword,
  comparHashedPassword,
};
