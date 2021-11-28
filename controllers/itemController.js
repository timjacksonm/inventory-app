const Item = require('../models/item');

// Site Home
exports.index = function (req, res) {
  res.render('index', { title: 'Inventory of shapes with colors' });
};

// Display all items
exports.item_list_get = async function (req, res) {
  try {
    const Items = await Item.find().populate('shape').populate('color');
    res.render('inventory', { title: 'Current Inventory', item_list: Items });
  } catch (e) {
    console.log('Error: ' + e.message);
  }
};

// Display single item based on ID
exports.item_view_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Single Item Expanded Page');
};

// Display create an item page
exports.create_item_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Create Item Page');
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
