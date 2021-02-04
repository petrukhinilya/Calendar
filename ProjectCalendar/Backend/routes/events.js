const express = require('express');
const event_controller = require('../controllers/events');
const router = express.Router();
const jwt = require('jsonwebtoken');

const myLogger = (req, res, next) => {
    console.log('Body', req.body)
    const { token } = req.body

    if (token) {
        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                console.log('xxx', err)
                res.status(401).send({ auth: false, message: "Failed to auth" })
            } else {
                const obj = JSON.parse(JSON.stringify(req.body))
                console.log('obj', obj)
                console.log(decoded)
                req.body.id = decoded.id
                // res.status(200).send({ status: "success", message: "TOKEN found!!!", auth: true })
                next(obj)
            }
        })
    } else {
        res.status(403).send({ success: false, message: "No Token Provided." })
    }

};

// router.use('/add',
//     myLogger,
//     event_controller.create_event
// );

router.post('/add',myLogger, event_controller.create_event);
router.get('/get', event_controller.get_events);
router.delete('/:id/delete', event_controller.delete_event);
router.put('/:id/update', event_controller.update_event);

module.exports = router;
