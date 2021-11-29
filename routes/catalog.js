const express = require('express');
const router = express.Router();
const item_controller = require('../controllers/itemController');
const shape_controller = require('../controllers/shapeController');
const color_controller = require('../controllers/colorController');

// GET catalog home page.
router.get('/', item_controller.index);

// GET request for list of all items
router.get('/inventory', item_controller.item_list_get);

// GET request for list of items sorted by color
router.get('/inventory/sort/color', color_controller.color_sorted);

// GET request for list of items sorted by shape || Not Implemented Yet
router.get('/inventory/sort/shape', shape_controller.items_sorted);

// GET request for update colors page
router.get('/inventory/update/colors', color_controller.update_color_get);

// GET request for create item page
router.get('/inventory/create/item', item_controller.create_item_get);

// GET request to view single item expanded
router.get('/inventory/item/:id', item_controller.item_view_get);

// GET request to delete item by id
router.get('/inventory/:id/delete', item_controller.delete_item_get);

// GET request to update item by id
router.get('/inventory/:id/update', item_controller.update_item_get);

// POST request to create a new item
router.post('/inventory/create/item', item_controller.item_create_post);

// POST request to create a new color
router.post('/inventory/update/colors', color_controller.color_create_post);

// POST request to remove a color
router.post(
  '/inventory/update/colors/remove/:id',
  color_controller.color_remove_post
);

// POST request to delete an item
router.post('/inventory/:id/delete', item_controller.delete_item_post);

// POST request to update a item
router.post('/inventory/:id/update', item_controller.update_item_post);

module.exports = router;
