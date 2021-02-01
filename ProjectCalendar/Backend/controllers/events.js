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

            res.status(200).send(events)
        })
    },
    delete_event: function (req, res, next) {
        eventsModel.deleteOne({ _id: req.params.id }, function (err) {
            if (err) return next(err);
            res.status(200).send({ text: 'Deleted successfully!' });
        })
    },
    update_event: function (req, res, next) {
        console.log(req.body)
        eventsModel.updateOne({_id: req.params.id },{
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            event: req.body.event
        },
            function (err) {
            if (err) return next(err);
            res.status(200).send({ text: 'Update successfully!' });
        })
     }
}
