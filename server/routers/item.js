const { Router } = require('express');

const itemController = require('../controllers/itemController');

const itemRouter = Router();

itemRouter.get('/', itemController.index);
itemRouter.get('/:id', itemController.show);
itemRouter.post('/', itemController.create);
itemRouter.patch('/:id', itemController.update);
itemRouter.delete('/:id', itemController.destroy);

module.exports = itemRouter;
