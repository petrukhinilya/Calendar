const eventsModel = require('../models/events')

module.exports = {
    create_event: function (req, res, next) {

        eventsModel.create({ startDate: req.body.inputStartDate, endDate: req.body.inputEndDate, event: req.body.event, created_by: req.body.created_by }, function (err, result) {
            if (err) {
                console.log("error", err)
                next(err);
            } else {
                res.status(200).send({ status: "success", message: "Event added successfully!!!", data: { result } });
            }
        });
    },
    get_events: function (req, res, next) {
        eventsModel.find({}, function (err, events) {

            if (err) {
                console.log(err)
                return next(err)
            }
            // const arr = events.map(x => x.startDate)
            res.status(200).send(events)
        })
    }
}
