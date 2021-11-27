const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 50 },
  red: { type: String, required: true, minLength: 1, maxLength: 3 },
  green: { type: String, required: true, minLength: 1, maxLength: 3 },
  blue: { type: String, required: true, minLength: 1, maxLength: 3 },
});

// Virtual for color URL
ColorSchema.virtual('url').get(function () {
  return '/catalog/category/' + this._id;
});

//Export model
module.exports = mongoose.model('Color', ColorSchema);
