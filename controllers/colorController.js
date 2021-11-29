const Color = require('../models/color');
const Item = require('../models/item');
const url = require('url');
const hexRgb = require('hex-rgb');

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

// Display update colors page
exports.update_color_get = async function (req, res) {
  try {
    const colors = await Color.find();
    res.render('color_form', {
      title: 'Create or Remove Colors',
      color_list: colors,
    });
  } catch (e) {
    console.log('Error: ' + e.message);
  }
};

// POST request to remove a color
exports.color_remove_post = async function (req, res) {
  try {
    const selectedColor = await Color.find(
      { name: req.body.value },
      '_id name'
    );
    if (selectedColor !== null) {
      Color.findByIdAndRemove(selectedColor[0]._id, function callback(err) {
        if (err) {
          return next(err);
        }
      });
      res.redirect('/home/inventory');
    }
  } catch (e) {
    console.log('Error: ' + e.message);
  }
};

// POST request to create a color
exports.color_create_post = async function (req, res) {
  try {
    const { red, green, blue } = hexRgb(req.body.color);
    await Color.create({
      name: req.body.name,
      red: red,
      green: green,
      blue: blue,
    });
    res.redirect('/home/inventory');
  } catch (e) {
    console.log('Error: ' + e.message);
  }
};
