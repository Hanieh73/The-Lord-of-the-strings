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
    const data = req.body; //SHOULD INCLUDE user_id, state, difficulty AND story_id
    const newGame = await Game.create(data);
    console.log(newGame.game_id);
    const newProgress = await Progress.create(newGame.game_id, data);
    res.status(201).send({ Game: newGame, Progress: newProgress });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body; //DATA SHOULD BE saved_chat, score, items
    const progress = await Progress.getLatestOneByGameId(id);
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

    const allProgress = await Progress.getAllByGameId(id);
    allProgress.forEach(async (el) => {
      //console.log(el.progress_id);
      const progress = await Progress.getOneByProgressId(el.progress_id);
      const destroyProgress = await progress.destroy();
    });
    //LMAO, IF I DON'T USE TIMEOUT IT WILL GIVE A FOREIGN KEY ERROR AS IT TRIES
    //TO DELETE THE GAME BEFORE THE PROGRESS HAS BEEN DELETED.
    setTimeout(async () => {
      const game = await Game.getOneById(id);
      const destroyGame = await game.destroy();
    }, 500);

    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, showAllForUser, create, update, destroy };
