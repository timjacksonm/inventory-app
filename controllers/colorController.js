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
    if (colors.length) {
      res.render('inventory', {
        title: 'Current Inventory',
        item_list: Items,
        color_list: colors,
      });
    }
  } catch (e) {
    res.render('error', {
      message: 'Error displaying inventory sorted by color.',
      error: e,
    });
  }
};

// Display update colors page
exports.update_color_get = async function (req, res) {
  try {
    const colors = await Color.find();
    res.render('color_form', {
      title: 'Create or Remove Colors',
      color_list: colors,
      color_in_use: false,
    });
  } catch (e) {
    res.render('error', {
      message: 'Error displaying update colors page.',
      error: e,
    });
  }
};

// POST request to remove a color
exports.color_remove_post = async function (req, res) {
  try {
    const selectedColor = await Color.find(
      { name: req.body.value },
      '_id name'
    );
    const colorInUse = await Item.find({ color: selectedColor[0]._id })
      .count()
      .exec();

    if (colorInUse) {
      const colors = await Color.find();
      res.render('color_form', {
        title: 'Create or Remove Colors',
        color_list: colors,
        color_in_use: true,
      });
      return;
    }
    if (selectedColor.length) {
      Color.findByIdAndRemove(selectedColor[0]._id, function callback(err) {
        if (err) {
          return next(err);
        } else {
          res.redirect('/home/inventory');
        }
      });
    }
  } catch (e) {
    res.render('error', {
      message: 'Error with request to delete a color.',
      error: e,
    });
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
    res.render('error', {
      message: 'Error with request to create a new color.',
      error: e,
    });
  }
};
