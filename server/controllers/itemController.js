const Item = require('../models/Item');

async function index(req, res) {
  try {
    const items = await Item.getAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const item = await Item.getOneById(id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newItem = await Item.create(data);
    res.status(201).send(newItem);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const item = await Item.getOneById(id);
    const updateItem = await item.update(data);

    res.status(200).json(updateItem);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);

    const item = await Item.getOneById(id);
    const destroyItem = await item.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, create, update, destroy };
