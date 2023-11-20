const { Router } = require('express');

const gameController = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.get('/', gameController.index);
gameRouter.get('/:id', gameController.show);
gameRouter.post('/', gameController.create);
gameRouter.delete('/:id', gameController.destroy);
gameRouter.get('/show/:id', gameController.showAllForUser);
gameRouter.get('/scores/leaderboard', gameController.showScores);
//No updating game settings once created.
gameRouter.patch('/:id', gameController.update);

module.exports = gameRouter;
