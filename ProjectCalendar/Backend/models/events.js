const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Events = new Schema({
    startDate: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    created_by:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Events', Events)