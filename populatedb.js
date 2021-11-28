const mongoose = require('mongoose');
const async = require('async');
const Color = require('./models/color');
const Shape = require('./models/shape');
const Item = require('./models/item');
const ItemInstance = require('./models/iteminstance');
require('dotenv').config();

const mongoDB = process.env.PROD_DB_URL || process.env.DEV_DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const colors = [];
const shapes = [];
const items = [];
const iteminstances = [];

async function colorCreate(name, red, green, blue, cb) {
  try {
    const color = await Color.create({
      name: name,
      red: red,
      blue: blue,
      green: green,
    });
    console.log(`New Color: ${color}`);
    colors.push(color);
    cb(null, color);
  } catch (e) {
    console.log(e.message);
  }
}

async function shapeCreate(shapeType, width, height, cb) {
  try {
    const shape = await Shape.create({
      shapeType: shapeType,
      width: width,
      height: height,
    });
    console.log(`New Shape: ${shape}`);
    shapes.push(shape);
    cb(null, shape);
  } catch (e) {
    console.log(e.message);
  }
}

async function itemCreate(title, color, shape, cb) {
  try {
    const item = await Item.create({
      title: title,
      shape: shape,
      color: color,
    });
    console.log(`New Item: ${item}`);
    items.push(item);
    cb(null, item);
  } catch (e) {
    console.log(e.message);
  }
}

async function itemInstanceCreate(item, stockcount, status, cb) {
  try {
    const itemInstance = await ItemInstance.create({
      item: item,
      stockcount: stockcount,
      status: status,
    });
    console.log(`New ItemInstance: ${itemInstance}`);
    iteminstances.push(itemInstance);
    cb(null, itemInstance);
  } catch (e) {
    console.log(e.message);
  }
}

function createColors(cb) {
  async.series(
    [
      function (callback) {
        colorCreate('White', 255, 255, 255, callback);
      },
      function (callback) {
        colorCreate('Black', 0, 0, 0, callback);
      },
      function (callback) {
        colorCreate('Blue', 0, 0, 255, callback);
      },
      function (callback) {
        colorCreate('Red', 255, 0, 0, callback);
      },
      function (callback) {
        colorCreate('Green', 0, 255, 0, callback);
      },
      function (callback) {
        colorCreate('Yellow', 255, 255, 0, callback);
      },
      function (callback) {
        colorCreate('Orange', 255, 165, 0, callback);
      },
      function (callback) {
        colorCreate('Fuchsia', 255, 0, 255, callback);
      },
      function (callback) {
        colorCreate('Aqua', 0, 255, 255, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createShapes(cb) {
  async.series(
    [
      function (callback) {
        shapeCreate('Triangle', 100, 100, callback);
      },
      function (callback) {
        shapeCreate('Square', 100, 100, callback);
      },
      function (callback) {
        shapeCreate('Rectangle', 100, 100, callback);
      },
      function (callback) {
        shapeCreate('Pentagon', 100, 100, callback);
      },
      function (callback) {
        shapeCreate('Hexagon', 100, 100, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.series(
    [
      function (callback) {
        itemCreate('Default1', colors[0], shapes[0], callback);
      },
      function (callback) {
        itemCreate('Default2', colors[1], shapes[0], callback);
      },
      function (callback) {
        itemCreate('Default3', colors[2], shapes[0], callback);
      },
      function (callback) {
        itemCreate('Default4', colors[3], shapes[0], callback);
      },
      function (callback) {
        itemCreate('Default5', colors[4], shapes[0], callback);
      },
      function (callback) {
        itemCreate('Default1', colors[0], shapes[1], callback);
      },
      function (callback) {
        itemCreate('Default2', colors[1], shapes[1], callback);
      },
      function (callback) {
        itemCreate('Default3', colors[2], shapes[1], callback);
      },
      function (callback) {
        itemCreate('Default4', colors[3], shapes[1], callback);
      },
      function (callback) {
        itemCreate('Default5', colors[4], shapes[1], callback);
      },
      function (callback) {
        itemCreate('Default1', colors[0], shapes[2], callback);
      },
      function (callback) {
        itemCreate('Default2', colors[1], shapes[2], callback);
      },
      function (callback) {
        itemCreate('Default3', colors[2], shapes[2], callback);
      },
      function (callback) {
        itemCreate('Default4', colors[3], shapes[2], callback);
      },
      function (callback) {
        itemCreate('Default5', colors[4], shapes[2], callback);
      },
      function (callback) {
        itemCreate('Default1', colors[0], shapes[3], callback);
      },
      function (callback) {
        itemCreate('Default2', colors[1], shapes[3], callback);
      },
      function (callback) {
        itemCreate('Default3', colors[2], shapes[3], callback);
      },
      function (callback) {
        itemCreate('Default4', colors[3], shapes[3], callback);
      },
      function (callback) {
        itemCreate('Default5', colors[4], shapes[3], callback);
      },
      function (callback) {
        itemCreate('Default1', colors[0], shapes[4], callback);
      },
      function (callback) {
        itemCreate('Default2', colors[1], shapes[4], callback);
      },
      function (callback) {
        itemCreate('Default3', colors[2], shapes[4], callback);
      },
      function (callback) {
        itemCreate('Default4', colors[3], shapes[4], callback);
      },
      function (callback) {
        itemCreate('Default5', colors[4], shapes[4], callback);
      },
    ],
    // optional callback
    cb
  );
}

function createItemInstances(cb) {
  async.series(
    [
      function (callback) {
        itemInstanceCreate(items[0], 10, 'In Stock', callback);
      },
      function (callback) {
        itemInstanceCreate(items[1], 9, 'In Stock', callback);
      },
      function (callback) {
        itemInstanceCreate(items[2], 0, 'Discontinued', callback);
      },
      function (callback) {
        itemInstanceCreate(items[3], 0, 'Coming Soon', callback);
      },
      function (callback) {
        itemInstanceCreate(items[4], 0, 'Coming Soon', callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createColors, createShapes, createItems, createItemInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('iteminstances: ' + iteminstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
