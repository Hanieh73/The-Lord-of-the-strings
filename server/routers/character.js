const { Router } = require('express');

const characterController = require('../controllers/characterController');

const characterRouter = Router();

characterRouter.get('/', characterController.index);
characterRouter.get('/:id', characterController.show);
characterRouter.post('/', characterController.create);
characterRouter.patch('/:id', characterController.update);
characterRouter.delete('/:id', characterController.destroy);

module.exports = characterRouter;
