let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let user = new Schema({
    name: {type: String},
    address: {type: String},
    email: {type: String}
});

module.exports = mongoose.model('user', user, 'users');