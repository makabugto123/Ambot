const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'encyclopedia',
  description: 'search for and retrieve detailed information from the Stanford Encyclopedia of Philosophy,
  usage: 'encyclopedia [text]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: encyclopedia <text>" }, pageAccessToken);

    try {
       const { data } = await axios.get(`https://myapi-2f5b.onrender.com/stanford/${encodeURIComponent(prompt)}`);
      
      sendMessage(senderId, { text: data.extract }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
