const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { nanoid } = require('nanoid');
const authRouter = require('./routers/authRouter');
const Url = require('./models/urlSchema');

const secret = process.env.JWT_SECRET;
const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(DB).then(() => {
  console.log('DB connected');
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/dist`));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.post('/', authenticateToken, async (req, res) => {
  const { longUrl, user } = req.body;
  console.log(user);
  try {
    console.log('in the post request');
    let shortUrl = await Url.findOne({ longUrl });
    console.log(shortUrl);
    if (shortUrl) {
      res.send(`http://localhost:3000/${shortUrl}`);
    } else {
      shortUrl = nanoid(7);
      console.log(shortUrl);
      await Url.insertMany({ longUrl, shortUrl });
      res.send(`http://localhost:3000/${shortUrl}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Oops something went wrong');
  }
});

app.get('/auth', (req, res) => {
  res.sendFile(path.resolve('./dist/auth.html'));
});
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

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
