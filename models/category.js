import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  color: { type: String, required: true, minLength: 6, maxLength: 6 },
});

// Virtual for category URL
GenreSchema.virtual('url').get(function () {
  return '/catalog/category/' + this._id;
});

//Export model
module.exports = mongoose.model('Category', CategorySchema);
