require('dotenv').config();

const OpenAI = require('openai');

const chat = async (conversation) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
  });

  const res = await openai.chat.completions.create({
    //pop our code to get the chat
    model: 'gpt-3.5-turbo',
    messages: [...conversation],
  });

  return res.choices[0].message.content;
};

module.exports = chat;
