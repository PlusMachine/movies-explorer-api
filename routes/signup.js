const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const { emailRegex } = require('../utils/regex');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = router;
