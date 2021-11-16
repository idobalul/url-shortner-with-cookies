const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const {
  hashPassword,
  comparHashedPassword,
} = require('../helpers/helperFunctions');

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
    res.status(201).send('User created, now sign in');
  } catch (error) {
    res.status(500).send('Oops something went wrong');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send('User not exist try to sign up');
      return;
    }
    const userPassword = user.password;
    if (!(await comparHashedPassword(password, userPassword))) {
      res.status(400).send('Incorrect password');
      return;
    }
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    res.cookie('token', token, { maxAge: 3600000 });
    res.send('http://localhost:3000');
  } catch (error) {
    res.status(500).send('Oops something went wrong');
  }
});

module.exports = router;
