import mongoose from 'mongoose';

const { Schema } = mongoose;

const ItemSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  shape: { type: Schema.Types.ObjectId, ref: 'Shape', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  salepitch: { type: String, required: true, maxLength: 100 },
});

// Virtual for shape's URL
ShapeSchema.virtual('url').get(function () {
  return '/catalog/shape/' + this._id;
});

//Export model
module.exports = mongoose.model('Item', ItemSchema);
