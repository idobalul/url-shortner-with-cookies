const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(DB).then(() => {
  console.log('DB connected');
});

app.use(cors());
app.use(express.json());
// app.use("/", express.static(path.resolve("./dist")));

app.get('/', (req, res) => {
  res.sendFile(express.static(path.resolve('./dist/index.html')));
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
