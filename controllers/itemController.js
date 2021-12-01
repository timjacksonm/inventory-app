const Item = require('../models/item');
const Color = require('../models/color');
const ItemInstance = require('../models/iteminstance');
const Shape = require('../models/shape');

// Site Home
exports.index = function (req, res) {
  res.render('index', { title: 'Inventory of shapes with colors' });
};

// Display all items
exports.item_list_get = async function (req, res) {
  try {
    const promises = [
      Item.find().populate('shape').populate('color'),
      Color.find(),
    ];
    const [items, colors] = await Promise.allSettled(promises);
    if (items.value.length && colors.value.length) {
      res.render('inventory', {
        title: 'Current Inventory',
        item_list: items.value,
        color_list: colors.value,
      });
    } else {
      throw new Error('database returned empty array.');
    }
  } catch (e) {
    res.render('error', {
      message: 'Error displaying inventory page',
      error: e,
    });
  }
};

// Display single item based on ID
exports.item_view_get = async function (req, res) {
  try {
    const itemData = await ItemInstance.find({ item: req.params.id })
      .populate('item')
      .populate({ path: 'item', populate: { path: 'shape' } })
      .populate({ path: 'item', populate: { path: 'color' } });
    console.log(itemData);
    if (itemData.length) {
      res.render('item', {
        item_data: itemData[0].item,
        instance: itemData[0],
      });
    }
  } catch (e) {
    res.render('error', {
      message: 'Error displaying single item based on ID page',
      error: e,
    });
  }
};

// Display create an item page
exports.create_item_get = async function (req, res) {
  try {
    const promises = [Color.find(), Shape.find()];
    const [colors, shapes] = await Promise.allSettled(promises);
    if (colors.value.length && shapes.value.length) {
      res.render('create_item_form', {
        title: 'Create A New Item',
        color_list: colors.value,
        shape_list: shapes.value,
        error: null,
      });
    } else {
      throw new Error('database returned empty array.');
    }
  } catch (e) {
    res.render('error', {
      message: 'Error creating a new item.',
      error: e,
    });
  }
};

// Display delete an item page
exports.delete_item_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Delete Item Page');
};

// Display update an item page
exports.update_item_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Update Item Page');
};

// POST request to create an item
exports.item_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Item Create POST');
};

// POST request to delete an item
exports.delete_item_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Item Delete POST');
};

// POST request to update an item
exports.update_item_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Item Update POST');
};
