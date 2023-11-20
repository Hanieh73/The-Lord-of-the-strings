const Progress = require('../models/Progress');

async function index(req, res) {
  try {
    const progress = await Progress.getAll();
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const progress = await Progress.getOneByProgressId(id);
    res.status(200).json(progress);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getAllByGameId(req, res) {
  try {
    const user_id = parseInt(req.params.id);
    const progress = await Progress.getAllByGameId(user_id);
    console.log(progress);
    res.status(200).json(progress);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getLatestOneByGameId(req, res) {
  try {
    const game_id = parseInt(req.params.id);
    console.log(game_id);
    const progress = await Progress.getLatestOneByGameId(game_id);
    console.log(progress);
    res.status(200).json(progress);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, getAllByGameId, getLatestOneByGameId };
