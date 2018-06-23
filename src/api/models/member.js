var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var memberSchema = new Schema({
  code:{
    type: Number,
    required: [true, "Mandatory: Code"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Mandatory: Name"],
    unique: true
  },
  phone: {
    type: String,
    required: [true, "Mandatory: Contact number"],
  },
  email: {
    type: String,
    lowercase: true
  },
  address:{},
  company:{
    type: String
  },
  website: {
    type: String,
    lowercase: true
  },
  division: Number
}, {
  strict: true
});

memberSchema.plugin(timestamps);
var Member = mongoose.model('Member', memberSchema);

module.exports = Member;
