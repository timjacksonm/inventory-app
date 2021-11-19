import mongoose from 'mongoose';

const { Schema } = mongoose;

const ShapeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  points: { type: Number, required: true, maxLength: 8 },
  width: { type: Number, required: true, maxLength: 100 },
  height: { type: Number, required: true, maxLength: 100 },
});

// Virtual for shape's URL
ShapeSchema.virtual('url').get(function () {
  return '/catalog/shape/' + this._id;
});

//Export model
module.exports = mongoose.model('Shape', ShapeSchema);
