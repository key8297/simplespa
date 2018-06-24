var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Mandatory: Name"],
  },
  password: {
    type: String,
    required: [true, "Mandatory: Password"],
  },
  division: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;