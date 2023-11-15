require('dotenv').config();

const OpenAI = require('openai');

const chat = async (conversation) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
  });

  const res = await openai.chat.completions.create({
    //pop our code to get the chat
    model: 'gpt-3.5-turbo',
    messages: [
      // {
      //   role: 'system',
      //   content:
      //     'You are John Wick from the John Wick movies. You are to answer questions as this character. Do not break character. Please return your answer formatted as html including p tags for new paragraphs',
      // },
      // {
      //   role: 'user',
      //   content: question,
      // },
      ...conversation,
    ],
  });

  return res.choices[0].message.content;
};

module.exports = chat;
