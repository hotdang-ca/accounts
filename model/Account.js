var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
  id: String,
  name: String,
  balance: Number,
  owner: String,
});

module.exports = mongoose.model('Account', AccountSchema);
