const { Router } = require('express');

const progressController = require('../controllers/progressController');

const progressRouter = Router();

progressRouter.get('/', progressController.index);
progressRouter.get('/:id', progressController.show);
progressRouter.get('/game/:id', progressController.getLatestOneByGameId); //Actually gets by game id now.
progressRouter.get('/all/game', progressController.getAllByGameId);
//                           ^Might need :id there.
module.exports = progressRouter;
