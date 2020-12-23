const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, unique:true},
});


// Export the model
module.exports = mongoose.model('Product', Users);