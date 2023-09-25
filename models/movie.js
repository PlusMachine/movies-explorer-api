const mongoose = require('mongoose');
const { httpRegex } = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(r) {
        return httpRegex.test(r);
      },
      message: 'Wrong URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(r) {
        return httpRegex.test(r);
      },
      message: 'Wrong URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(r) {
        return httpRegex.test(r);
      },
      message: 'Wrong URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
