const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user');

router.post('/register', user_controller.create);
router.post('/authenticate', user_controller.authenticate);
router.post('/verify',user_controller.verify_token)

module.exports = router;
