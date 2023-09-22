const router = require('express').Router();

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

module.exports = router;
