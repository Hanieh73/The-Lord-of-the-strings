const { Router } = require('express');

const chatController = require('../controllers/chatController');

const chatRouter = Router();

// chatRouter.get("/", chatController.index);
// chatRouter.get("/:id", chatController.show);
chatRouter.post('/', chatController.generate);
// chatRouter.delete("/:id", chatController.destroy);
// chatRouter.patch("/:id", chatController.update);

module.exports = chatRouter;
