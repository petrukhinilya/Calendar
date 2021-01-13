const eventsModel = require('../models/events')

module.exports = {
    create_event: function (req, res, next) {

        eventsModel.create({ startDate: req.body.startDate, endDate: req.body.endDate, event: req.body.event, created_by: req.body.created_by }, function (err, result) {
            if (err) {
                console.log("error", err)
                next(err);
            } else {
                res.status(200).send({ status: "success", message: "Event added successfully!!!" });
            }
        });
    }
}
