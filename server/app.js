const express = require('express');
const cors = require('cors');

const chatRouter = require('./routers/chats');
const userRouter = require('./routers/users');
const gameRouter = require('./routers/games');
const storyRouter = require('./routers/story');
const characterRouter = require('./routers/character');
const itemRouter = require('./routers/item');
const progressRouter = require('./routers/progress');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is The Lord of The Strings API');
});

// Routes
app.use('/chats', chatRouter);
app.use('/users', userRouter);
app.use('/games', gameRouter);
app.use('/stories', storyRouter);
app.use('/characters', characterRouter);
app.use('/items', itemRouter);
app.use('/progress', progressRouter);

module.exports = app;
