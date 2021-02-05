const express = require('express');
const event_controller = require('../controllers/events');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {
    const { token } = req.body

    if (token) {
        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                console.log(err)
                res.status(401).send({ auth: false, message: "Failed to auth" })
            } else {
                req.body.id = decoded.id
                next()
            }
        })
    } else {
        res.status(403).send({ success: false, message: "No Token Provided." })
    }
};

const queryVerify = (req, res, next) => {
    const { token } = req.query

    if (token) {
        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                console.log('xxx', err)
                res.status(401).send({ auth: false, message: "Failed to auth" })
            } else {
                next()
            }
        })
    } else {
        res.status(403).send({ success: false, message: "No Token Provided." })
    }

};

router.post('/add', tokenVerify, event_controller.create_event);
router.get('/get', queryVerify, event_controller.get_events);
router.delete('/:id/delete', tokenVerify, event_controller.delete_event);
router.put('/:id/update', tokenVerify, event_controller.update_event);

module.exports = router;
