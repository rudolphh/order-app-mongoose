let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let order = new Schema({
    userName: {type: String},
    address: {type: String},
    email: {type: String},
    items: [{
        itemName: {type: String}
    }],
    createdAt: {type:Date}
    
}, { timestamps: true });

module.exports = mongoose.model('order', order, 'orders');