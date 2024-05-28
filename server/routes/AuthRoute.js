const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/AuthControllers');

router.post('/login', loginUser);

router.post('/register', registerUser);

module.exports = router;