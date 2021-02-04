const Events = require('../models/events');
const jwt = require('jsonwebtoken');

module.exports = {
    create_event: function (req, res, next) {
        const { token } = req.body
        const { inputStartDate, inputEndDate, event, created_by } = req.body;
        console.log('123123', JSON.stringify(req.body, null, 2))

        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                console.log('xxx', err)
                res.status(401).send({ auth: false, message: "Failed to auth" })
            } else {
                Events.create({ startDate: inputStartDate, endDate: inputEndDate, event, created_by }, function (err, result) {
                    if (err) {
                        console.log("error", err)
                        next(err);
                    } else {
                        res.status(200).send({ status: "success", message: "Event added successfully!!!", data: { result } });
                    }
                })
            }
        })
    },
    get_events: function (req, res, next) {
        Events.find({}, function (err, events) {

            if (err) {
                console.log(err)
                return next(err)
            }

            res.status(200).send(events)
        })
    },
    delete_event: function (req, res, next) {
        Events.deleteOne({ _id: req.params.id }, function (err) {
            if (err) return next(err);
            res.status(200).send({ text: 'Deleted successfully!' });
        })
    },
    update_event: function (req, res, next) {
        const { inputStartDate, inputEndDate, event, created_by } = req.body;
        Events.updateOne({ _id: req.params.id }, { startDate: inputStartDate, endDate: inputEndDate, event, created_by },
            function (err) {
                if (err) return next(err);
                res.status(200).send({ text: 'Update successfully!' });
            }
        )
    }
}

