const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
// const jtw = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authRouter');

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

app.get('/auth', (req, res) => {
  res.sendFile(path.resolve('./dist/auth.html'));
});
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
