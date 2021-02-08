const express = require('express');
const event_controller = require('../controllers/events');
const router = express.Router();
const verify = require('../middleware/verifyToken')

router.post('/add', verify.tokenVerify, event_controller.create_event);
router.get('/get', verify.queryVerify, event_controller.get_events);
router.delete('/:id/delete', verify.tokenVerify, event_controller.delete_event);
router.put('/:id/update', verify.tokenVerify, event_controller.update_event);

module.exports = router;
