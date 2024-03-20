const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  estimatedPrice: {
    type: String,
    required: true
  },
  travelTime: {
    type: String,
    required: true
  },
  appUsed: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
