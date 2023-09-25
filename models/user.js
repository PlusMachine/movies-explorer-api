const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { emailRegex } = require('../utils/regex');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The field must be filled in'],
    minlength: [2, 'The minimum length of the "name" field should be at least 2 characters.'],
    maxlength: [30, 'The maximum length of the "name" field should be no more than 30 characters.'],
  },
  email: {
    type: String,
    required: [true, 'The field must be filled in'],
    unique: true,
    validate: {
      validator(email) {
        return emailRegex.test(email);
      },
      message: 'Введите верный email',
    },
  },
  password: {
    type: String,
    required: [true, 'The field must be filled in'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Wrong email or password');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Wrong email or password');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
