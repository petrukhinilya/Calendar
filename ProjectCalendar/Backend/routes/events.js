const express = require('express');
const event_controller = require('../controllers/events');
const router = express.Router();
const jwt = require('jsonwebtoken');

// let myLogger = function (req, res, next) {
//     const { token } = req.body
//     console.log('Token', token)
//     console.log(req.body)
//     jwt.verify(token, 'secretKey', (err, decoded) => {
//       if (err) {
//         console.log('xxx', err)
//         res.status(401).send({ auth: false, message: "Failed to auth" })
//       } else {
//         console.log('Accept')
//         req.body.id = decoded.id
//         res.status(200).send({ status: "success", message: "TOKEN found!!!", auth: true })
//         next()
//       }
//     })
// };

// router.use('/addevent', 
// myLogger,
//  event_controller.create_event);

router.post('/add', event_controller.create_event);
router.get('/get',event_controller.get_events);
router.delete('/:id/delete',event_controller.delete_event);

module.exports = router;