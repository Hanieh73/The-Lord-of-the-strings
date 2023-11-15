const Game = require('../models/Game');
const Progress = require('../models/Progress');

async function index(req, res) {
  try {
    const games = await Game.getAll();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const game = await Game.getOneById(id);
    res.status(200).json(game);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function showAllForUser(req, res) {
  try {
    const user_id = parseInt(req.params.id);
    const game = await Game.getAllByUser(user_id);
    res.status(200).json(game);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newGame = await Game.create(data);
    console.log(newGame.game_id);
    const newProgress = await Progress.create(newGame.game_id);
    res.status(201).send({ Game: newGame, Progress: newProgress });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const progress = await Progress.getOneById(id);
    const updateProgress = await progress.update(data);
    const game = await Game.getOneById(id);
    const updateGame = await game.update();
    res.status(200).json({ Game: updateGame, Progress: updateProgress });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const progress = await Progress.getOneById(id);
    const game = await Game.getOneById(id);
    const destroyProgress = await progress.destroy();
    const destroyGame = await game.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, showAllForUser, create, update, destroy };
