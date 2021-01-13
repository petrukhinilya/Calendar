const express = require('express');
const event_controller = require('../controllers/events');
const router = express.Router();

let myLogger = function (req, res, next) {
    console.log(req.body);
    next();
};

router.use('/addevent',myLogger,event_controller.create_event);



router.post('/addevent', event_controller.create_event)

module.exports = router;