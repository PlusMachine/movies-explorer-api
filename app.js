const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

const router = require('./routes');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(router);

app.use(errors());

app.listen(PORT, () => {
});
