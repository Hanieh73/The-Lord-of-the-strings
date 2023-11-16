const { Router } = require('express');

const storyController = require('../controllers/storyController');

const storyRouter = Router();

storyRouter.get('/', storyController.index);
storyRouter.get('/:id', storyController.show);
storyRouter.post('/', storyController.create);
storyRouter.patch('/:id', storyController.update);
storyRouter.delete('/:id', storyController.destroy);

module.exports = storyRouter;
