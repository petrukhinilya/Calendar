const Events = require('../models/events')

module.exports = {
    create_event: function (req, res, next) {
        const { inputStartDate, inputEndDate, event, created_by } = req.body;

        Events.create({ startDate: inputStartDate, endDate: inputEndDate, event, created_by }, function (err, result) {
            if (err) {
                console.log("error", err)
                next(err);
            } else {
                res.status(200).send({ status: "success", message: "Event added successfully!!!", data: { result } });
            }
        });
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

