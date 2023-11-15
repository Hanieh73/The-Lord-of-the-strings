const express = require('express');
const cors = require('cors');

const chatRouter = require('./routers/chats');
const userRouter = require('./routers/users');
const gameRouter = require('./routers/games');

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

module.exports = app;
