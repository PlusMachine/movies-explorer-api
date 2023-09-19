const {
  HTTP_STATUS_OK,
} = require('http2').constants;

const mongoose = require('mongoose');
const Users = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const getUser = (req, res, next) => {
  Users.findById(req.user._id)
    .orFail()
    .then((currentUser) => res.status(HTTP_STATUS_OK).send(currentUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`No user by this _id: ${req.user._id} was found.`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUser,
};
