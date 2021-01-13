const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let Users = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

const saltRounds = 10;
// hash user password before saving into database
Users.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});


module.exports = mongoose.model('Users', Users);

