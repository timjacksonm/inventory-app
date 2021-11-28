const Color = require('../models/color');
const Item = require('../models/item');
const url = require('url');

// Display items sorted by color
exports.color_sorted = async function (req, res) {
  try {
    const queryObject = url.parse(req.url, true).query;
    let Items;
    if (queryObject.value === 'All') {
      Items = await Item.find().populate('shape').populate('color');
    } else {
      const colorRef = await Color.find({ name: queryObject.value }, '_id');
      Items = await Item.find({ color: colorRef[0]._id })
        .populate('shape')
        .populate('color');
    }
    const colors = await Color.find();
    res.render('inventory', {
      title: 'Current Inventory',
      item_list: Items,
      color_list: colors,
    });
  } catch (e) {
    console.log('Error: ' + e.message);
  }
};

// Display create a color page
exports.create_color_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Create A Color Page');
};

// POST request to create a color
exports.color_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Color Create POST');
};
