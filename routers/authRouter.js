const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const { hashPassword } = require('../helpers/helperFunctions');

const secret = process.env.JWT_SECRET;
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (username.length < 3) {
    res.status(400).send('Username too short');
    return;
  }
  try {
    const checkName = await User.findOne({ username });
    if (checkName) {
      res.status(400).send('User already exist');
      return;
    }
    const hashedPassword = await hashPassword(password);
    await User.insertMany({ username, password: hashedPassword });
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Oops something went wrong');
  }
});

module.exports = router;
