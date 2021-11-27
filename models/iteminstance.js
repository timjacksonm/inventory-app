const mongoose = require('mongoose');

const ItemInstanceSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, //reference to the associated item
  stockcount: { type: Number, required: true, maxlength: 100 },
  status: {
    type: String,
    required: true,
    enum: ['In Stock', 'Out Of Stock', 'Discontinued', 'Coming Soon'],
    default: 'Coming Soon',
  },
});

// Virtual for iteminstance's URL
ItemInstanceSchema.virtual('url').get(function () {
  return '/catalog/iteminstance/' + this._id;
});

//Export model
module.exports = mongoose.model('ItemInstance', ItemInstanceSchema);
