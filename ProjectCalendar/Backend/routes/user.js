const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user');

// router.get('/test', user_controller.test);
// router.get('/login',user_controller.login)

router.post('/register', user_controller.create);
router.post('/authenticate', user_controller.authenticate);

module.exports = router;