const mongoose = require('mongoose');

const ShapeSchema = new mongoose.Schema({
  shapeType: {
    type: String,
    required: true,
    enum: ['Triangle', 'Square', 'Rectangle', 'Pentagon', 'Hexagon'],
  },
  width: { type: Number, required: true, maxLength: 100 },
  height: { type: Number, required: true, maxLength: 100 },
});

// Virtual for shape's URL
ShapeSchema.virtual('url').get(function () {
  return '/catalog/shape/' + this._id;
});

ShapeSchema.virtual('shapeSpecs').get(function () {
  switch (this.shapeType) {
    case 'Triangle':
      return `${this.shapeType} has 3 points.`;
    case 'Square':
      return `${this.shapeType} has 4 points of equal width & height.`;
    case 'Rectangle':
      return `${this.shapeType} has 4 points.`;
    case 'Pentagon':
      return `${this.shapeType} has 5 points.`;
    case 'Hexagon':
      return `${this.shapeType} has 6 points.`;
    default:
      break;
  }
});

//Export model
module.exports = mongoose.model('Shape', ShapeSchema);
