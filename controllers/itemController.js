const Item = require('../models/item');
const Color = require('../models/color');
const ItemInstance = require('../models/iteminstance');
const Shape = require('../models/shape');
const { ObjectId } = require('mongodb');

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

// Display delete item page
exports.delete_item_get = async function (req, res) {
  try {
    const itemData = await ItemInstance.find({ item: req.params.id })
      .populate('item')
      .populate({ path: 'item', populate: { path: 'shape' } })
      .populate({ path: 'item', populate: { path: 'color' } });
    if (itemData.length) {
      res.render('delete_item', {
        item_data: itemData[0].item,
        instance: itemData[0],
      });
    }
  } catch (e) {
    res.render('error', {
      message: 'Error displaying delete item page',
      error: e,
    });
  }
};

// Display update an item page
exports.update_item_get = async function (req, res) {
  try {
    const itemData = await ItemInstance.find({ item: req.params.id })
      .populate('item')
      .populate({ path: 'item', populate: { path: 'shape' } })
      .populate({ path: 'item', populate: { path: 'color' } });
    const promises = [Color.find(), Shape.find()];
    const [colors, shapes] = await Promise.allSettled(promises);
    if (itemData.length && colors.value.length && shapes.value.length) {
      res.render('update_item', {
        item_data: itemData[0].item,
        instance: itemData[0],
        color_list: colors.value,
        shape_list: shapes.value,
        error: null,
      });
    }
  } catch (e) {
    res.render('error', {
      message: 'Error displaying delete item page',
      error: e,
    });
  }
};

// POST request to create an item
exports.item_create_post = async function (req, res) {
  try {
    await Item.create({
      title: req.body.name,
      shape: ObjectId(req.body.shapeId),
      color: ObjectId(req.body.colorId),
    });
    const itemID = await Item.find({ title: req.body.name }, '_id title');
    if (req.body.stockCount > 0) {
      await ItemInstance.create({
        item: ObjectId(itemID[0]._id.toString()),
        stockcount: req.body.stockCount,
        status: 'In Stock',
      });
    }
    if (req.body.stockCount < 1) {
      await ItemInstance.create({
        item: ObjectId(itemID[0]._id.toString()),
        stockcount: req.body.stockCount,
        status: 'Out Of Stock',
      });
    }
    res.redirect('/home/inventory');
  } catch (e) {
    res.render('error', {
      message: 'Error creating a new item.',
      error: e,
    });
  }
};

// POST request to delete an item
exports.delete_item_post = async function (req, res) {
  try {
    const instance = await ItemInstance.find({ item: req.params.id }, '_id');
    ItemInstance.findByIdAndRemove(instance[0]._id, function callback(err) {
      if (err) {
        return next(err);
      }
    });
    Item.findByIdAndRemove(ObjectId(req.params.id), function callback(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/home/inventory');
      }
    });
  } catch (e) {
    res.render('error', {
      message: 'Error creating a new item.',
      error: e,
    });
  }
};

// POST request to update an item
exports.update_item_post = async function (req, res) {
  try {
    const instance = await ItemInstance.find({ item: req.params.id }, '_id');
    const instanceUpdate =
      req.body.stockCount < 1
        ? { stockcount: req.body.stockCount, status: 'Out Of Stock' }
        : { stockcount: req.body.stockCount, status: 'In Stock' };
    const itemUpdate = {
      title: req.body.name,
      shape: ObjectId(req.body.shapeId),
      color: ObjectId(req.body.colorId),
    };
    ItemInstance.findByIdAndUpdate(
      instance[0]._id,
      instanceUpdate,
      function callback(err) {
        if (err) {
          return next(err);
        }
      }
    );
    Item.findByIdAndUpdate(req.params.id, itemUpdate, function callback(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect(`/home/inventory/item/${req.params.id}`);
      }
    });
  } catch (e) {
    res.render('error', {
      message: 'Error updating item by id.',
      error: e,
    });
  }
};
