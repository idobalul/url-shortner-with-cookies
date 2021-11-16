const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { nanoid } = require('nanoid');
const authRouter = require('./routers/authRouter');
const Url = require('./models/urlSchema');
const { authenticateToken } = require('./middleware/userHandler');

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

app.use('/', async (req, res, next) => {
  if (
    req._parsedUrl.path === '/styles.css' ||
    req._parsedUrl.path === '/auth' ||
    req._parsedUrl.path === '/auth/login' ||
    req._parsedUrl.path === '/auth/signup' ||
    req._parsedUrl.path === '/user' ||
    req._parsedUrl.path === '/'
  ) {
    next();
  } else {
    try {
      const short = req._parsedUrl.path.substr(1);
      const { longUrl } = await Url.findOne({ shortUrl: short });
      res.redirect(longUrl);
    } catch (error) {
      console.log(error);
      next();
    }
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.post('/', authenticateToken, async (req, res) => {
  const { longUrl } = req.body;
  try {
    const urlObj = await Url.findOne({ longUrl });
    if (urlObj) {
      res.send(`http://localhost:3000/${urlObj.shortUrl}`);
    } else {
      const shortUrl = nanoid(7);
      await Url.insertMany({ longUrl, shortUrl });
      res.send(`http://localhost:3000/${shortUrl}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Oops something went wrong');
  }
});

app.get('/user', authenticateToken, (req, res) => {
  res.send(req.body.user.username);
});

app.get('/auth', (req, res) => {
  res.sendFile(path.resolve('./dist/auth.html'));
});
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
