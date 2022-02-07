var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
   userID: String,
   product : []
});

module.exports = mongoose.model('Cart', CartSchema);