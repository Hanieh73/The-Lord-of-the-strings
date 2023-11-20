const chat = require('../chatgpt');

async function generate(req, res) {
  try {
    const message = req.body;
    const output = await chat(message);
    res.send({ message: output });
  } catch (err) {
    //CHANGE STATUS CODE
    res.status(404).json({ error: err.message });
  }
}

module.exports = { generate };
