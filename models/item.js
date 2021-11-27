const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 18 },
  shape: { type: mongoose.Schema.Types.ObjectId, ref: 'Shape', required: true },
  color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color', required: true },
});

// Virtual for shape's URL
ItemSchema.virtual('url').get(function () {
  return '/catalog/shape/' + this._id;
});

//Export model
module.exports = mongoose.model('Item', ItemSchema);
