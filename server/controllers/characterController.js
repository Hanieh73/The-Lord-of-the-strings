const Character = require('../models/Character');

async function index(req, res) {
  try {
    const characters = await Character.getAll();
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const character = await Character.getOneById(id);
    res.status(200).json(character);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newCharacter = await Character.create(data);
    res.status(201).send(newCharacter);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const character = await Character.getOneById(id);
    const updateCharacter = await character.update(data);

    res.status(200).json(updateCharacter);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);

    const character = await Character.getOneById(id);
    const destroyCharacter = await character.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log(err);
  }
}

module.exports = { index, show, create, update, destroy };
