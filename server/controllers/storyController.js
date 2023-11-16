const Story = require('../models/Story');

async function index(req, res) {
  try {
    const stories = await Story.getAll();
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const story = await Story.getOneById(id);
    res.status(200).json(story);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newStory = await Story.create(data);
    res.status(201).send(newStory);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const story = await Story.getOneById(id);
    const updateStory = await story.update(data);

    res.status(200).json(updateStory);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);

    const story = await Story.getOneById(id);
    const destroyStory = await story.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, create, update, destroy };
