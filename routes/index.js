const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

router.use('/signup', signUpRouter);
router.use('/signin', signInRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
